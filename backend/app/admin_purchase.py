
from app.models import Purchase
from flask import Flask,Blueprint,request,redirect,render_template,url_for

adPurchases = Blueprint("admin_purchase",__name__)


@adPurchases.route('/admin_purchase')
def admin_purchase():
    purchases = Purchase.query.order_by(Purchase.time.desc()).all()
    
    return render_template("admin_purchase.html",purchases=purchases)

#@adPurchases.route('/admin_purchase_html')

    