from flask import Flask,Blueprint,request,flash,render_template,request,send_from_directory
from app.models import Product
from app import db
import os
import uuid
from werkzeug.utils import secure_filename

addproduct = Blueprint('addproduct',__name__)
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')

@addproduct.route('/add_product',methods =['GET','POST'])
def add():
    if request.method == 'POST':
        name = request.form['name']
        description = request.form['description']
        price = request.form['price']
        stock = request.form['stock']
        category = request.form['category']
        
        file = request.files['file']
        file_extension = file.filename.rsplit('.',1)[1].lower()
        unique_extension = generate_unique_filename(file_extension)
        filename = os.path.join(UPLOAD_FOLDER,unique_extension)
        file.save(filename)
        

        product = Product(name = name, description= description,price = price,stock = stock,category= category,image= filename)
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


def generate_unique_filename(extension):
    while True:
        unique_filename = str(uuid.uuid4()) + '.' + extension
        filepath = os.path.join(UPLOAD_FOLDER, unique_filename)
        if not os.path.exists(filepath):
            return unique_filename

@addproduct.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
