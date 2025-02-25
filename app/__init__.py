from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail,Message
import os
from werkzeug.utils import secure_filename
import uuid

db = SQLAlchemy()
mail = Mail()

def create_app():
    app = Flask(__name__)
    
    app.config.from_object('app.config.Config')
    db.init_app(app)
    mail.init_app(app)
    from app.routes import main
    app.register_blueprint(main)
    
    

    return app