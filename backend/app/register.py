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
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
from werkzeug.utils import secure_filename


registersetup = Blueprint("registersetup",__name__)

@registersetup.route('/api/register', methods=['POST'])
def registeri():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    name = request.form.get('name')
    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')
    print("come here")
    if not all([name, username, email, password]):
        return jsonify({'error': 'Missing form data'}), 400

    hashed_pass = generate_password_hash(password, method='pbkdf2:sha512', salt_length=16)
    file = request.files['file']
    file_extension = file.filename.rsplit('.',1)[1].lower()
    unique_extension = generate_unique_filename(file_extension)

    filename = os.path.join(UPLOAD_FOLDER, unique_extension)
    file.save(filename)
    print(filename)
    user = User(name = name , username= username, email = email, password = hashed_pass, profile_pic= filename)
    try:
        db.session.add(user)
        db.session.commit()
    except:
        return jsonify({"error"}),400

    user_id = 123

    return jsonify({
        'message': 'User successfully registered',
        'user_id': user_id,
        'profile_pic': filename
    }), 201


def generate_unique_filename(extension):
    while True:
        unique_filename = str(uuid.uuid4()) + '.' + extension
        filepath = os.path.join(UPLOAD_FOLDER, unique_filename)
        if not os.path.exists(filepath):
            return unique_filename
