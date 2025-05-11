from flask import  Blueprint,render_template,session,request,url_for,redirect,send_from_directory,flash,jsonify,get_flashed_messages
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
from app.oauth import oauth
import secrets

loginsetup = Blueprint("loginsetup",__name__)

@loginsetup.route('/api/login', methods=['POST'])
def logina():
    data = request.get_json(force=True)
    username = data.get('username')
    password = data.get('password')
    try:
        user = User.query.filter(User.username == username).first()
        if user and check_password_hash(user.password, password):
            login_user(user, remember=True)
            return jsonify({'message': 'Logged in successfully', 'redirect_url': '/profile'}), 201
        else:
            return jsonify({'message': 'Incorrect username or password', 'redirect_url': '/login_html'}), 400
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'An error occurred'}), 500
