from flask import Flask,render_template,request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'
db = SQLAlchemy(app)

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
        return "successfully added"
    except:
        return "There was an error while adding the product"

@app.route('/products/<category>')
def products(category):
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
    return render_template('/login.html')

@app.route('/register', methods =['GET','POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        username  = request.form['username']
        email = request.form['email']
        password = request.form['password']
    user = User(name = name , username= username, email = email, password = password)
    try:
        db.session.add(user)
        db.session.commit()
        return "user succesfully added"
    except:
        return "FAILED TO GET USER"

@app.route('/login',methods = ['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
    try:
        user = User.query.filter(User.username == username).first()
        user_pass = user.password
        if password == user_pass:
            return "head into login"
        else:
            return "login not allowed"
    except:
        return "some error caused"

with app.app_context():
    db.create_all()  # This creates all tables defined in your models

if __name__ == '__main__':
    app.run(debug =True)