"""
from flask import Flask,render_template,request, redirect, url_for,session,flash,send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail,Message
import os
from werkzeug.utils import secure_filename
import uuid

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'
db = SQLAlchemy(app)
app.secret_key="hi it is mme"
UPLOAD_FOLDER ='uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024


app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = '2024ashikul@gmail.com'
app.config['MAIL_PASSWORD'] = 'lkmp dfgm vwsd bgck'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)



class Product(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    name = db.Column(db.String(200),nullable = False)
    description = db.Column(db.String(200),nullable = False)
    price = db.Column(db.Integer,nullable = False)
    stock = db.Column(db.Integer,nullable = False)
    category = db.Column(db.String(100),nullable = False)
    image = db.Column(db.String(100),nullable = False)

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    username = db.Column(db.String , unique = True, nullable = False)
    email = db.Column(db.String, unique = True, nullable = False)
    password = db.Column(db.String,nullable = False)
    profile_pic = db.Column(db.String, nullable = False)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/send_mail_all_html')
def send_mail_all_html():
    return render_template('send_promotional.html')

@app.route('/add_product',methods =['GET','POST'])
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

@app.route('/products/<category>')
def products(category):
    if category == "all":
        products = Product.query.order_by(Product.id).all()
    else:
        products = Product.query.order_by(Product.id).filter_by(category = category)
    return render_template('/products.html',products= products)

@app.route('/register_html',methods= ['GET','POST'])
def register_html():
    return render_template('/register.html')

@app.route('/add_product_html')
def add_product_html():
    return render_template('add_product.html')

@app.route('/')
def home():
    return render_template('/home.html')

@app.route('/login_html')
def login_html():
    if 'username' in session:
        username = session['username']
        print(username)
        return redirect('/profile')
    return render_template('/login.html')

@app.route('/register', methods =['GET','POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        username  = request.form['username']
        email = request.form['email']
        password = request.form['password']
        file = request.files['file']
        file_extension = file.filename.rsplit('.',1)[1].lower()
        unique_extension = generate_unique_filename(file_extension)

        filename = os.path.join(app.config['UPLOAD_FOLDER'], unique_extension)
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
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        if not os.path.exists(filepath):
            return unique_filename

@app.route('/send_mail_all',methods=['GET','POST'])
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

@app.route('/login',methods = ['GET','POST'])
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
    
@app.route('/profile_html')
def profile_html():
    return render_template('profile.html')

@app.route('/profile')
def profile():
    if 'username' in session:
        username = session['username']
        user = User.query.filter_by(username = username).first()
        email = user.email
        picture_url = user.profile_pic
        return render_template('profile.html',username = username,email= email,picture_url = picture_url)

    else:
        return redirect('/login')
    

@app.route('/search/',methods = ['GET','POST'])
def search():
    keyword = request.form['keyword']
    print('came here')
    result = Product.query.filter(Product.description.like(keyword)).all()
    return render_template("products.html",products = result)

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

with app.app_context():
    db.create_all()  # This creates all tables defined in your models

if __name__ == '__main__':
    app.run(debug =True)


"""