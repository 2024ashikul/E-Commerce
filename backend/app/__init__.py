from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail,Message
import os
from werkzeug.utils import secure_filename
import uuid
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from flask_migrate import Migrate
from app.oauth import configure_oauth
from flask_socketio import SocketIO

db = SQLAlchemy()
mail = Mail()
login_manager = LoginManager()
login_manager.login_view = '/login_html'
socketio = SocketIO(cors_allowed_origins="*")

def create_app():
    app = Flask(__name__)
    migrate = Migrate(app,db)
    app.config.from_object('app.config.Config')
    db.init_app(app)
    mail.init_app(app)
    login_manager.init_app(app)
    migrate.init_app(app)
    socketio.init_app(app)
    configure_oauth(app)
    socketio.init_app(app, cors_allowed_origins="*")

    from app.routes import main
    from app.send_mail import sendmail
    from app.addproduct import addproduct
    from app.admin import adminpage
    from app.searching import searching
    from app.profile import profiles
    from app.admin_purchase import adPurchases
    from app.chat import chatting
    app.register_blueprint(sendmail)
    app.register_blueprint(main)
    app.register_blueprint(addproduct)
    app.register_blueprint(adminpage)
    app.register_blueprint(searching)
    app.register_blueprint(profiles)
    app.register_blueprint(adPurchases)
    app.register_blueprint(chatting)
    
    return app

@login_manager.user_loader
def load_user(user_id):
    from app.models import User  
    return User.query.get(int(user_id))