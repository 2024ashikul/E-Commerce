from flask import  Blueprint,render_template,request,url_for,redirect,flash,jsonify
from app import db
from app.models import Product
from app.models import Cart
from app.models import Purchase
from app.send_mail import send_mail

from flask_login import  login_required, current_user


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
    #for i in cart_items:
        #total = total + (i.product.price)*i.quantity
    purchases = Purchase.query.filter(Purchase.user_id == current_user.id).all()

    return render_template('profile.html',username = username,email= email,picture_url = picture_url,cart_items = cart_items,total = total,purchases=purchases)


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
        flash(f"{name} added to the cartss","success")
    return redirect(url_for('profile.profile'))


@profiles.route('/api/products/addtocart',methods=['GET','POST'])
@login_required
def addtocartapi():
    if request.method  == 'POST':
        product_id = request.form['product_id']
        print(product_id)
        product = Product.query.filter(Product.id == product_id).first()
        cart_item = Cart(user_id = current_user.id ,product_id = product.id, quantity = 1)
        name = product.name
        db.session.add(cart_item)
        db.session.commit()
        flash(f"{name} added to the cartss","success")
    return redirect(url_for('profile.profile'))


@profiles.route('/api/remove_from_cart',methods =['POST'])
def removefromcart2():
    print("came to remove")
    data = request.get_json(force = True)
    item_id = data.get('item_id')
    print(item_id)
    try:
        todelete =  Cart.query.filter(Cart.id == item_id).first()
        name = todelete.product.name
        db.session.delete(todelete)
        db.session.commit()
        flash(f"Removed {name} from cart","success")
        print("delete done")
        return jsonify({'message':'item removed successfulyy','redirect_url':'/profile'}),201
    except: 
        return jsonify({'message':'some error caused'}),400





@profiles.route('/api/addquantity',methods=['POST'])
def addquantityapi():
    if request.method == 'POST':
        data = request.get_json(force = True)
        item_id = data.get('item_id')
        try:
            item = Cart.query.filter(Cart.id == item_id).first()
            item.quantity = item.quantity + 1
            db.session.commit()
            flash("Increased Cart Item","success")
            return jsonify({'message': 'item added successfully','quantity' : item.quantity}),201
        except:
            return redirect('/profile')



@profiles.route('/api/decreasequantity',methods=['POST'])
def decreasequantityapi():
    if request.method == 'POST':
        data = request.get_json(force= True)
        item_id = data.get('item_id')
        item = Cart.query.filter(Cart.id == item_id).first()
        item.quantity = item.quantity - 1
        db.session.commit()
        message = "Decreased succesfully"
        flash(message, "success")
        return jsonify({'message':'decreased successfully','quantity':item.quantity}),201
    return redirect('/profile')


@profiles.route('/api/checkout',methods =['POST'])
def checkouta():
    if request.method == 'POST':
        data = request.get_json(force = True)
        print(data)
        cartid = data.get('item_id')
        print(cartid)
        tocheckout =  Cart.query.filter(Cart.id == cartid).first()
        name = tocheckout.product.name
        newpurchase = Purchase(user_id = current_user.id,product_id = tocheckout.product.id,quantity= tocheckout.quantity,)
        db.session.add(newpurchase)
        db.session.delete(tocheckout)
        db.session.commit()
        flash("Product purchased successfully","success")
        try :
            recipient =  list()
            recipient.append(current_user.email)
            print(current_user.email)
            print(recipient)
            message = "Your product purchased succesfully"
            send_mail(recipient,message)
            return jsonify({'message':'Product purchase was sucessful','redirect_url':'/profile'}),201
        except:
            print("Email failed to send")
            print("purchase done")
            return jsonify({'message':'Product purchase was unsucessful','redirect_url':'/profile'}),400
    
    return redirect('/profile')