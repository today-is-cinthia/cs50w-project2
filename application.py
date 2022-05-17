
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
channels=["General"]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/home", methods=["GET", "POST"])
def home():
    if request.method == "POST":
                
        #for i in nombres:
         #   if name == i:
          #      flash("This user already exists. Try again")
           #     return redirect("/")
        name = request.form.get("name")
        nombres.append(name)
        session['name']=name
        nombre= session['name']
        session.permanent=True

        channel = request.form.get("channel")
        for i in channels:
            if channel == i:
                flash("This channel already exists. Try again")
                return redirect("/home")
        channels.append(channel)
        print(channels)
    else:
        if request.method == "GET":
            nombre= session['name']
            session.permanent=True

    return render_template("home.html",nombre=nombre, canal=channels) 
    
@socketio.on("add channel")
def add_chanel(data):
    emit('display channels',data["channel"], broadcast=True)


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