document.addEventListener('DOMContentLoaded',() => {
    var socket = io.connect(location.protocol+'//' + document.domain + ':' + location.port);

 var name = localStorage.getItem("name")
 var canal_storage = localStorage.getItem("currentchannel")

//borrar del almacenamiento nombre al salir
document.querySelector("#salir").onclick = () =>{
  localStorage.getItem("name")
  localStorage.removeItem("name")
}
document.querySelector("#createchanel").onclick = () =>{
  var canales = document.querySelector("#channel").value

  socket.emit('add channel', canales)

}


socket.on('display channels', canales => {
  var noselaverdad = document.createElement("a");
  noselaverdad.classList.add('dropdown-item');
  noselaverdad.innerHTML =  `<buttton class="btn btn-link" data-channel="${canales}">${canales}</button>`;
  document.querySelector("#menu").append(noselaverdad)
  //boton_canal =document.querySelectorAll(".btn btn-link");
  //boton_canal.forEach(button =>{
    //button.onclick = () =>{
      //moco=localStorage.setItem("currentchannel", button)
      //var establecer_canal = localStorage.getItem("currentchannel")

      //var mequedesinideas= localStorage.getItem("name");
      //socket.emit('joined', establecer_canal, mequedesinideas);
    //}

})

var listadebotones = document.getElementsByClassName("btn btn-link")
for(var i= 0; i< listadebotones.length; i++){
  listadebotones[i].addEventListener('click', function(){
    botoncanal = this.value
    localStorage.setItem("currentchannel", botoncanal)
    alert("¡  You have joined to " +localStorage.getItem("currentchannel") + "  !  🥰")
    document.querySelector("#enviar").disabled=false;
  })
}


/*ocument.querySelector("#enviar").onsubmit = () =>{
  const name_usuario = localStorage.getItem("name");
  const nombre_canal = localStorage.getItem("currentchannel");
  const mensaje =  document.querySelector("#mensaje").value;

  const tiempo_instancia = new Date();

  const tiempo = tiempo_instancia.toLocaleString('es-ES', {hour:'numeric', minute: 'numeric', hour12: true})
  var fecha = tiempo_instancia.toDateString();
  fecha = fecha.slice(4, fecha.length);

  socket.emit('mensaje enviado', nombre_canal, name_usuario, mensaje, tiempo, fecha);
}*/

socket.on('connect', () =>{
  elmensaje= document.querySelector("#mensaje").value
  socket.emit('add message', elmensaje, canal_storage)
})

  if(canal_storage == undefined){
    document.querySelector("#enviar").disabled=true;
}

socket.on('connect', () => {

  socket.on('message', function(data) { 
    $('#lista').append('<h6 >' + name + '</h6><small>' + data + '</small>')  
    })

    $('#enviar').on('click', function() {
      socket.send($('#mensaje').val());
      $('#mensaje').val('');
    })

});


// socket.on('connect', () => {

  // socket.on('joined', function(canal_storage,name) { 
    // $('#bienvenida').append('<h6 >' + name + '</h6>')  
    // })

    // $('#enviar').on('click', function() {
      // socket.send($('#mensaje').val());
      // $('#mensaje').val('');
    // })

// });

/*socket.on('unirse al canal', data =>{
  localStorage.setItem("currentchannel", data.nombre_canal)
  alert(`Bienvenido a ${data.nombre_canal}`)

  const mensajespqyanosequehacer = data.channels[data.nombre_canal]
  for(var i = 0; i < mensajespqyanosequehacer.length; i++){
    usuario =  mensajespqyanosequehacer[i][0];
    fecha = mensajespqyanosequehacer[i][1];
    tiempo = mensajespqyanosequehacer[i][2];
    mensaje = mensajespqyanosequehacer[i][3];
    div = document.createElement("div");
    if(username === storage.getItem("name")){
      div.innerHTML = `<div class="alert alert-success" role="alert" style="text-align:right; float:right; width: 70%; overflow-wrap: anywhere; word-wrap: break-word;"><strong> ${usuario}: </strong> <div> ${mensaje} </div> <small> ${fecha} ${tiempo} </small>`;
  }else{
      div.innerHTML = `<div class="alert alert-primary" role="alert" style="text-align:left; float:left; width: 70%; overflow-wrap: anywhere; word-wrap: break-word;"><strong> ${usuario}: </strong> <div> ${mensaje} </div> <small> ${fecha} ${tiempo} </small>`;
  }
  document.querySelector('#lista').append(div);

  }
  
  

})

//mensajes
/*socket.on('connect', ()=>{
  document.querySelector("#enviar").onclick = () =>{
    if(canal_actual == ""){
      alert("You have to join a channel first")
    }else{
      
      socket.on('message', function(data) { 
        $('#lista').append('<h6 >' + name + '</h6><small>' + data + '</small>')  
        })
    
        $('#enviar').on('click', function() {
          socket.send($('#mensaje').val());
          $('#mensaje').val('');
        })

    }
  }
})*/


/*socket.on('mensaje recibido', recibido => {
  const nombrecanal = recibido.channelname;
  const data = received.data;
  const usuario = data[0];
  const fecha = data[1];
  const tiempo = data[2];
  const mensaje = data[3];

  if(nombrecanal === storage.getItem("currentchannel")){
    const div = document.createElement('div');
    if(usuario === storage.getItem("name")){
        div.innerHTML = `<div class="alert alert-success" role="alert" style="text-align:right; float:right; width: 70%; overflow-wrap: anywhere; word-wrap: break-word;"><strong> ${usuario}: </strong> <div> ${mensaje} </div> <small> ${fecha} ${tiempo} </small>`;
    }else{
        div.innerHTML = `<div class="alert alert-primary" role="alert" style="text-align:left; float:left; width: 70%; overflow-wrap: anywhere; word-wrap: break-word;"><strong> ${usuario}: </strong> <div> ${mensaje} </div> <small> ${fecha} ${tiempo} </small>`;
    }
    document.querySelector('#lista').append(div);
}
})*/


})
