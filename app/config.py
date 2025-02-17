import os
class Config:
    
    SQLALCHEMY_DATABASE_URI = 'sqlite:///db.db'
    SECRET_KEY="hi it is mme"
    UPLOAD_FOLDER ='uploads'

    MAX_CONTENT_LENGTH = 16 * 1024 * 1024
    
    MAIL_SERVER='smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USERNAME = '2024ashikul@gmail.com'
    MAIL_PASSWORD = 'lkmp dfgm vwsd bgck'
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    