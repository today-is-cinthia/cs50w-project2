
import os

from flask import Flask, session, flash, redirect, render_template,request
from flask_socketio import SocketIO, emit, send
from dotenv import load_dotenv
#from requests import request


app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

nombres = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/home", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        name = request.form.get("name")
        for i in nombres:
            if name == i:
                flash("User already exists")
        if name == None:
            flash("required")
        nombres.append(name)
        session['name'] = name
    return render_template("home.html") 

@app.route("/logout", methods=["GET", "POST"])
def logout():
    session.clear()
    return redirect("/")

@socketio.on('message')
def handle_message(data):
    print('received message:' + data)
    send(data, broadcast = True)


if __name__ == '__main__':
    socketio.run(app)