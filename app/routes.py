from flask import  Blueprint,render_template,session,request,url_for,redirect,send_from_directory,flash,jsonify
from app import db,mail
from app.models import Product
from app.models import User
from app.models import Cart
from app.__init__ import login_manager
import os
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash,check_password_hash
import uuid
from flask_mail import Mail,Message
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from app.oauth import oauth
import secrets


UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')

main = Blueprint('main',__name__)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@main.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@main.route('/send_mail_all_html')
def send_mail_all_html():
    return render_template('send_promotional.html')

@main.route('/products/<category>')
def products(category):
    if category == "all":
        products = Product.query.order_by(Product.id).all()
    else:
        products = Product.query.order_by(Product.id).filter_by(category = category)
    return render_template('/products.html',products= products)

@main.route('/register_html',methods= ['GET','POST'])
def register_html():
    return render_template('/register.html')


@main.route('/')
def home():
    
    try:
        items = Product.query.order_by(Product.time.desc()).limit(12).all()
        print(items)
        print("succesfull")
        return render_template('/home.html', items= items )
    except :
        print("an error occured")
    return render_template('/home.html', items= items )

@main.route('/login_html')
def login_html():
    if current_user.is_authenticated:
        return redirect("profile")
    return render_template('/login.html')

@main.route('/register', methods =['GET','POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        username  = request.form['username']
        email = request.form['email']
        password = request.form['password']
        hashed_pass = generate_password_hash(password,method='pbkdf2:sha512',salt_length = 16)
        file = request.files['file']
        file_extension = file.filename.rsplit('.',1)[1].lower()
        unique_extension = generate_unique_filename(file_extension)

        filename = os.path.join(UPLOAD_FOLDER, unique_extension)
        file.save(filename)

    user = User(name = name , username= username, email = email, password = hashed_pass, profile_pic= filename)
    try:
        db.session.add(user)
        db.session.commit()
        return "user succesfully added"
    except:
        return "FAILED TO GET USER"

@main.route('/api/register', methods=['POST'])
def registeri():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    name = request.form.get('name')
    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')
    print("come here")
    if not all([name, username, email, password]):
        return jsonify({'error': 'Missing form data'}), 400

    hashed_pass = generate_password_hash(password, method='pbkdf2:sha512', salt_length=16)
    file = request.files['file']
    file_extension = file.filename.rsplit('.',1)[1].lower()
    unique_extension = generate_unique_filename(file_extension)

    filename = os.path.join(UPLOAD_FOLDER, unique_extension)
    file.save(filename)

    user = User(name = name , username= username, email = email, password = hashed_pass, profile_pic= filename)
    try:
        db.session.add(user)
        db.session.commit()
    except:
        return jsonify({"error"}),400

    user_id = 123

    return jsonify({
        'message': 'User successfully registered',
        'user_id': user_id,
        'profile_pic': filename
    }), 201







def generate_unique_filename(extension):
    while True:
        unique_filename = str(uuid.uuid4()) + '.' + extension
        filepath = os.path.join(UPLOAD_FOLDER, unique_filename)
        if not os.path.exists(filepath):
            return unique_filename


@main.route('/login',methods = ['GET','POST'])
def login():

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
    try:
        user = User.query.filter(User.username == username).first()
        
        if user and check_password_hash(user.password,password):
            login_user(user,remember =True)
            flash(f"Hi, {user.name.upper()}! Welcome Back!","success")
            return redirect('profile')
        else:
            flash("Incorrect password or username","warning")
            return redirect('/login_html')
    except:
        flash("Incorrect password or username","warning")
        flash("Some error caused")
        return redirect('/login_html')
    

@main.route('/logout')
def logout():
    logout_user()
    return redirect('/')


@login_manager.unauthorized_handler
def unauthorized():
    print("Unauthorized")
    return redirect("/")


@main.route("/google")
def google_login():
    ""# Generate a nonce (a random string)
    nonce = secrets.token_urlsafe(32)
    
    # Store the nonce in the session
    session['nonce'] = nonce
    ""
    # Pass the nonce to the Google OAuth authorization request
    return oauth.google.authorize_redirect(
        url_for("main.google_auth", _external=True), 
        nonce=nonce
    )



@main.route("/google/auth")
def google_auth():
    # Step 2: Retrieve the access token
    token = oauth.google.authorize_access_token()

    try:
        # Include the nonce while parsing the ID token
        nonce = session.get('nonce')  # Retrieve nonce from session
        if not nonce:
            return "Nonce is missing!", 400  # Just a safeguard to ensure the nonce exists
        
        user_info = oauth.google.parse_id_token(token, nonce=nonce)
    except Exception as e:
        return f"An error occurred: {str(e)}"


    existing_user = User.query.filter_by(email=user_info['email']).first()
    
    if existing_user:
        if not existing_user.password :
            login_user(existing_user, remember=True)
            return redirect(url_for('profile.profile'))
        else:
            flash("Login using your Username and Password","warning")
            flash("Account already exists with associated Email","warning")
            return redirect(url_for('main.login_html'))
    else:

        new_user = User(
            email=user_info['email'],
            username=user_info['sub'],
            name=user_info.get('name'),
            profile_pic=user_info.get('picture')
        )
    
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user, remember=True)
        return redirect(url_for('profile'))
    

