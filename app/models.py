from . import db

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
