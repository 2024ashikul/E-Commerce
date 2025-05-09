
from . import db
from flask_login import UserMixin
from datetime import datetime

class Product(db.Model):
    __tablename__= "product"
    id = db.Column(db.Integer,primary_key = True)
    name = db.Column(db.String(200),nullable = False)
    brand = db.Column(db.String(200),nullable = True)
    releasedate = db.Column(db.String(200), nullable = True)
    description = db.Column(db.String(200),nullable = False)
    price = db.Column(db.Integer,nullable = False)
    stock = db.Column(db.Integer,nullable = False)
    category = db.Column(db.String(100),nullable = False)
    image = db.Column(db.String(100),nullable = False)
    availabity = db.Column(db.Boolean,nullable = True)
    time = db.Column(db.DateTime,default= datetime.now)
    hardware = db.relationship("Hardware",back_populates = "product")
    battery = db.relationship("Battery",back_populates = "product")
    display = db.relationship("Display",back_populates = "product")
    connectivity = db.relationship("Connectivity",back_populates = "product")
    camera = db.relationship("Camera",back_populates = "product")
    software = db.relationship("Software",back_populates = "product")
    extrainfo = db.relationship("Extrainfo",back_populates = "product")


class User(db.Model,UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    username = db.Column(db.String , unique = True, nullable = False)
    email = db.Column(db.String, unique = True, nullable = False)
    password = db.Column(db.String)
    profile_pic = db.Column(db.String, nullable = False)
    cart_items = db.relationship("Cart",back_populates="user",lazy = True)
    purchases = db.relationship("Purchase",back_populates = "user", lazy = True)

class Cart(db.Model):
    __tablename__ = 'cart'
    id = db.Column(db.Integer, primary_key =True)
    user_id = db.Column(db.Integer,db.ForeignKey("user.id"),nullable =False)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"),nullable = False)
    quantity = db.Column(db.Integer,default = 1)
    product = db.relationship("Product",backref = "cart_items")
    user = db.relationship("User", back_populates = "cart_items")

class Purchase(db.Model):
    __tablename__ = 'purchase'
    id = db.Column(db.Integer , primary_key = True)
    user_id = db.Column(db.Integer,db.ForeignKey("user.id"),nullable = False)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"),nullable = False)
    quantity = db.Column(db.Integer,default = 1)
    time = db.Column(db.DateTime, default =datetime.now)
    product = db.relationship("Product",backref = "purchases")
    user = db.relationship("User", back_populates = "purchases")


class Hardware(db.Model):
    __tablename__ = 'hardware'
    device_id = db.Column(db.Integer, db.ForeignKey('product.id'), primary_key=True)
    chipset = db.Column(db.String)
    ram = db.Column(db.String)
    storage = db.Column(db.String)
    storage_type = db.Column(db.String(200))
    gpu = db.Column(db.String(200))
    build_material = db.Column(db.String)
    weight = db.Column(db.String)
    product = db.relationship("Product", back_populates="hardware")

class Display(db.Model):
    __tablename__='display'
    device_id = db.Column(db.Integer,db.ForeignKey('product.id'),primary_key = True)
    screen_size = db.Column(db.String)
    screen_type = db.Column(db.String)
    resolution = db.Column(db.String)
    refresh_rate = db.Column(db.String)
    touchscreen  = db.Column(db.Boolean)
    product = db.relationship("Product",back_populates = "display")

class Battery(db.Model):
    __tablename__='battery'
    device_id = db.Column(db.Integer,db.ForeignKey('product.id'),primary_key = True)
    battery_capacity = db.Column(db.String)
    battery_type = db.Column(db.String)
    charging_speed = db.Column(db.String)
    wireless_charging = db.Column(db.Boolean)
    battery_life  = db.Column(db.String)
    product = db.relationship("Product",back_populates = "battery")

class Camera(db.Model):
    __tablename__='camera'
    device_id = db.Column(db.Integer,db.ForeignKey('product.id'),primary_key = True)
    rear_camera = db.Column(db.String)
    front_camera = db.Column(db.String)
    video_recording = db.Column(db.String)
    sensors = db.Column(db.String)
    extra  = db.Column(db.String)
    product = db.relationship("Product",back_populates = "camera")

class Connectivity(db.Model):
    __tablename__='connectivity'
    device_id = db.Column(db.Integer,db.ForeignKey('product.id'),primary_key = True)
    charging_port_type = db.Column(db.String)
    headphone_jack = db.Column(db.String)
    hdmi_ports = db.Column(db.String)
    wifi_specs = db.Column(db.String)
    bluetooth_specs  = db.Column(db.String)
    cellular_specs = db.Column(db.String)
    sim_type = db.Column(db.String)
    nfc = db.Column(db.String)
    gps =db.Column(db.String)
    product = db.relationship("Product",back_populates = "connectivity")

class Extrainfo(db.Model):
    __tablename__='extrainfo'
    device_id = db.Column(db.Integer,db.ForeignKey('product.id'),primary_key = True)
    biometrics = db.Column(db.String)
    stylus_support = db.Column(db.String)
    keyboard = db.Column(db.String)
    water_resistant = db.Column(db.String)
    speaker  = db.Column(db.String)
    microphone = db.Column(db.String)
    product = db.relationship("Product",back_populates = "extrainfo")

class Software(db.Model):
    __tablename__='software'
    device_id = db.Column(db.Integer,db.ForeignKey('product.id'),primary_key = True)
    operating_system = db.Column(db.String)
    os_version = db.Column(db.String)
    extra_features = db.Column(db.String)
    promised_updates = db.Column(db.String)
    product = db.relationship("Product",back_populates = "software")

