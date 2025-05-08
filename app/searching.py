from flask import Flask,Blueprint,request,redirect,render_template,url_for
from app.models import Product


searching = Blueprint("searching",__name__)



@searching.route('/search', methods=['GET', 'POST'])
def search():
    keyword = request.form.get('keyword','')  
    if not keyword:
        return redirect(url_for('main.home')) 

    result = Product.query.filter(Product.description.ilike(f"%{keyword}%")).all()
    count = len(result)
    
    return render_template("search_results.html", result=result,count = count)
