
import os

from flask import Flask, session, flash, redirect, render_template,request
from flask_socketio import SocketIO, emit, send
from dotenv import load_dotenv
#from requests import request


app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

nombres = []
channels=[]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/home", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        name = request.form.get("name")
        #for i in nombres:
         #   if name == i:
          #      flash("This user already exists. Try again")
           #     return redirect("/")
        nombres.append(name)
        session['name']=name
        nombre= session['name']
        session.permanent=True

        channel = request.form.get("channel")
        for i in channels:
            if channel == i:
                flash("This channel already exists. Try again")
        channels.append(channel)

    else:
        nombre= session['name']
        session.permanent=True
    return render_template("home.html",nombre=nombre, channels=channels) 

@app.route("/logout")
def logout():
    session.permanent=False
    return redirect("/")

@socketio.on('message')
def handle_message(data):
    print('received message:' + data)
    send(data, broadcast = True)


if __name__ == '__main__':
    socketio.run(app)