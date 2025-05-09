from flask import Flask,Blueprint,render_template
from flask_socketio import SocketIO, join_room, leave_room, send
from app.__init__ import socketio,login_manager,login_required

chatting = Blueprint("chatting",__name__)


@chatting.route('/profile/chat')
@login_required
def chat():
    
    return render_template("chat.html")


