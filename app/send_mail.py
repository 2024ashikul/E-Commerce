from flask import Blueprint,Flask,request
from app.models import User
from flask_mail import Mail,Message
from app.__init__ import mail


sendmail = Blueprint('sendmail',__name__)


@sendmail.route('/send_mail_all',methods=['GET','POST'])
def send_mail_all():
    message_subject = request.form['message_subject']
    message_body = request.form['message_body']
    results = User.query.with_entities(User.email).all()
    recipients = [email[0] for email in results ]
    msg = Message(message_subject, sender = '2024ashikul@gmail.com',recipients = recipients)
    msg.body = message_body
    mail.send(msg)
    return "email sent"

def send_mail():
    msg = Message('Hello i am ashikul islam', sender = '2024ashikul@gmail.com',recipients = ['2020ashikul@gmail.com'])
    msg.body = 'This is a test email from Flask-Mail.'
    mail.send(msg)
    return "Email sent!"