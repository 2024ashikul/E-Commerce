import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    
    SQLALCHEMY_DATABASE_URI = 'sqlite:///db.db'
    SECRET_KEY="hi it is mme"
    UPLOAD_FOLDER ='uploads'

    MAX_CONTENT_LENGTH = 16 * 1024 * 1024
    
    MAIL_SERVER='smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    