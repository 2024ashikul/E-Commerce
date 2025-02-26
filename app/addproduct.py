from flask import Flask,Blueprint,request,flash,render_template
from app.models import Product
from app import db

addproduct = Blueprint('addproduct',__name__)


@addproduct.route('/add_product',methods =['GET','POST'])
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

@addproduct.route('/add_product_html')
def add_product_html():
    return render_template('add_product.html')
