
import os

from flask import Flask, session, flash, redirect, render_template,request
from flask_socketio import SocketIO, emit, send
from dotenv import load_dotenv
#from requests import request


app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

nombres = []
channels=dict()
channels=["General"]

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
        session.permanent=True

        #channel = request.form.get("channel")
        #if channel in channels:
         #   flash("This channel already exists. Please try again")
          #  return redirect("/home")
       # channels.append(channel)
        #print(channels)
    else:
        if request.method == "GET":
            name= session['name']
            session.permanent=True

    return render_template("home.html",nombre=name, canal=channels) 

#@app.route("/canal/<canales>", methods=['GET','POST'])
#def canal(canales):
 #   mensajes=[]
  #  if canales not in channels:
   #     return redirect("/canal/General")
        
    #name= session['name']

    #mensaje = request.form.get("mensaje")

    #if mensaje == "":
     #   flash("Please fill the message field")
      #  return redirect("/canal/<canales>")
    #else:
     #   mensajes.append(mensaje)
    #return render_template("home.html", nombre=name, canal=channels, mensajes = mensajes)
    
@socketio.on("add channel")
def add_chanel(canales):
    if canales in channels:
        flash("Este canal ya existe. Por favor intente nuevamente")
    else:
        channels.append(canales)
        print(channels)
        emit('display channels',canales, broadcast=True)

@socketio.on('joined')
def joined(establecer_canal, mequedesinideas):
    emit("unirse al canal", {"nombre_canal": establecer_canal, "messages": channels[establecer_canal]})

@app.route("/logout")
def logout():
    session.permanent=False
    return redirect("/")


@socketio.on('message') 
def handle_Message(data): 
    print('Mensaje: ' + data) 
    send(data, broadcast = True)

if __name__ == '__main__':
    socketio.run(app)