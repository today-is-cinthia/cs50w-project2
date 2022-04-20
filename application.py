import os

from flask import Flask, session, flash, redirect, render_template
from flask_socketio import SocketIO, emit, send
from dotenv import load_dotenv


app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)


@app.route("/")
def index():
    return render_template("index.html")

@socketio.on('message')
def handle_message(data):
    print('received message:' + data)
    send('data', broadcast = True)


if __name__ == '__main__':
    socketio.run(app)