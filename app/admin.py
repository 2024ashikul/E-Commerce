from flask import Flask, Blueprint,render_template

adminpage = Blueprint("adminpage",__name__)

@adminpage.route('/admin')
def admin():
    return render_template('admin.html')