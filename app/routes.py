from flask import  Blueprint,render_template,session,request,url_for,redirect,send_from_directory,flash
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
            return redirect('profile')
        else:
            return "login not allowed"
    except:
        return "some error caused"
    
@main.route('/profile_html')
def profile_html():
    return render_template('profile.html')


@main.route('/profile')
@login_required
def profile():
    username = current_user.username
    email = current_user.email
    picture_url = current_user.profile_pic
    cart_items = Cart.query.filter(Cart.user_id == current_user.id).all()
    
    return render_template('profile.html',username = username,email= email,picture_url = picture_url,cart_items = cart_items)



@main.route('/search', methods=['GET', 'POST'])
def search():
    keyword = request.form.get('keyword','')  
    if not keyword:
        return redirect(url_for('main.home')) 

    
    result = Product.query.filter(Product.description.ilike(f"%{keyword}%")).all()
    count = len(result)
    
    return render_template("search_results.html", result=result,count = count)

@main.route('/logout')
def logout():
    logout_user()
    return redirect('/')



@main.route('/products/addtocart',methods=['GET','POST'])
@login_required
def addtocart():
    if request.method  == 'POST':
        product_id = request.form['product_id']
        print(product_id)
        product = Product.query.filter(Product.id == product_id).first()
        cart_item = Cart(user_id = current_user.id ,product_id = product.id, quantity = 1)
        #cart_item = Cart(user_id = current_user.id,product_id = product_id,product = product, user = current_user )
        db.session.add(cart_item)
        db.session.commit()

    return redirect("/")

@login_manager.unauthorized_handler
def unauthorized():
    print("Unauthorized")
    return redirect("/")