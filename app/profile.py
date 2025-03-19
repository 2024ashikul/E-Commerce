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

profiles = Blueprint("profile",__name__)

@profiles.route('/profile_html')
def profile_html():
    return render_template('profile.html')


@profiles.route('/profile')
@login_required
def profile():
    username = current_user.username
    email = current_user.email
    picture_url = current_user.profile_pic
    cart_items = Cart.query.filter(Cart.user_id == current_user.id).all()
    total = 0
    for i in cart_items:
        total = total + (i.product.price)*i.quantity
    
    return render_template('profile.html',username = username,email= email,picture_url = picture_url,cart_items = cart_items,total = total)


@profiles.route('/products/addtocart',methods=['GET','POST'])
@login_required
def addtocart():
    if request.method  == 'POST':
        product_id = request.form['product_id']
        print(product_id)
        product = Product.query.filter(Product.id == product_id).first()
        cart_item = Cart(user_id = current_user.id ,product_id = product.id, quantity = 1)
        name = product.name
        db.session.add(cart_item)
        db.session.commit()
        flash(f"{name} added to the cart","success")
    return redirect(url_for('profile.profile'))

@profiles.route('/removefromcart',methods=['POST'])
def removefromcart():
    if request.method == 'POST':
        cartid = request.form['item_id']
        print(f"id is {cartid}")
        todelete =  Cart.query.filter(Cart.id == cartid).first()
        print(todelete)
        name = todelete.product.name
        db.session.delete(todelete)
        db.session.commit()
        flash(f"Removed {name} from cart","success")
        print("delete done")
        
    return redirect("/profile")

@profiles.route('/addquantity',methods=['POST'])
def addquantity():
    if request.method == 'POST':
        item_id =request.form['item_id']
        item = Cart.query.filter(Cart.id == item_id).first()
        item.quantity = item.quantity + 1
        db.session.commit()
        flash("Increased Cart Item","success")
    return redirect('/profile')

@profiles.route('/decreasequantity',methods=['POST'])
def decreasequantity():
    if request.method == 'POST':
        item_id =request.form['item_id']
        item = Cart.query.filter(Cart.id == item_id).first()
        item.quantity = item.quantity - 1
        db.session.commit()
        message = "Decreased succesfully"
        flash(message, "success")
    return redirect('/profile')