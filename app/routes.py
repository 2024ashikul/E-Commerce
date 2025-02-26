from flask import  Blueprint,render_template,session,request,url_for,redirect,send_from_directory,flash
from app import db,mail
from app.models import Product
from app.models import User
import os
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash,check_password_hash
import uuid
from flask_mail import Mail,Message

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')

main = Blueprint('main',__name__)


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
    return render_template('/home.html')

@main.route('/login_html')
def login_html():
    if 'username' in session:
        username = session['username']
        print(username)
        return redirect('/profile')
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

def generate_unique_filename(extension):
    while True:
        unique_filename = str(uuid.uuid4()) + '.' + extension
        filepath = os.path.join(UPLOAD_FOLDER, unique_filename)
        if not os.path.exists(filepath):
            return unique_filename



@main.route('/login',methods = ['GET','POST'])
def login():
    if 'username' in session:
        username = session['username']
        return "already logged in "
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
    try:
        user = User.query.filter(User.username == username).first()
        
        if user and check_password_hash(user.password,password):
            session['username'] = username
            return redirect('profile_html')
        else:
            return "login not allowed"
    except:
        return "some error caused"
    
@main.route('/profile_html')
def profile_html():
    return render_template('profile.html')

@main.route('/profile')
def profile():
    if 'username' in session:
        username = session['username']
        user = User.query.filter_by(username = username).first()
        email = user.email
        picture_url = user.profile_pic
        return render_template('profile.html',username = username,email= email,picture_url = picture_url)

    else:
        return redirect('/login')




@main.route('/search/',methods = ['GET','POST'])
def search():
    keyword = request.form['keyword']
    print('came here')
    result = Product.query.filter(Product.description.like(keyword)).all()
    return render_template("products.html",products = result)

@main.route('/logout')
def logout():
    session.clear()
    return redirect('/')
