from flask import  Blueprint,render_template,session,request,url_for,redirect,send_from_directory,flash
from app import db,mail
from app.models import Product
from app.models import User
import os
from werkzeug.utils import secure_filename
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

@main.route('/add_product_html')
def add_product_html():
    return render_template('add_product.html')

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
        file = request.files['file']
        file_extension = file.filename.rsplit('.',1)[1].lower()
        unique_extension = generate_unique_filename(file_extension)

        filename = os.path.join(UPLOAD_FOLDER, unique_extension)
        file.save(filename)

    user = User(name = name , username= username, email = email, password = password, profile_pic= filename)
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

@main.route('/send_mail_all',methods=['GET','POST'])
def send_mail_all():
    message_subject = request.form['message_subject']
    message_body = request.form['message_body']
    results = User.query.with_entities(User.email).all()
    recipients = [email[0] for email in results ]
    msg = Message(message_subject, sender = '2024ashikul@gmail.com',recipients = recipients)
    msg.body = message_body
    mail.send(msg)
    return "email sent"

def send_mail():
    msg = Message('Hello i am ashikul', sender = '2024ashikul@gmail.com',recipients = ['2020ashikul@gmail.com'])
    msg.body = 'This is a test email from Flask-Mail.'
    mail.send(msg)
    return "Email sent!"

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
        user_pass = user.password
        if password == user_pass:
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


@main.route('/add_product',methods =['GET','POST'])
def add():
    if request.method == 'POST':
        name = request.form['name']
        description = request.form['description']
        price = request.form['price']
        stock = request.form['stock']
        category = request.form['category']
        image = request.form['image']
        product = Product(name = name, description= description,price = price,stock = stock,category= category,image= image)
    try:
        db.session.add(product)
        db.session.commit()
        flash("sucess! succefully added")
        return "successfully added"
    except:
        return "There was an error while adding the product"


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
