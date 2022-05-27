document.addEventListener('DOMContentLoaded',() => {
    var socket = io.connect(location.protocol+'//' + document.domain + ':' + location.port);

 var name = localStorage.getItem("name")

//borrar del almacenamiento nombre al salir
document.querySelector("#salir").onclick = () =>{
  localStorage.getItem("name")
  localStorage.removeItem("name")
}
document.querySelector("#createchanel").onclick = () =>{
  var canales = document.querySelector("#channel").value

  socket.emit('add channel', canales)

}

canal_actual=localStorage.getItem("current_channel")

socket.on('display channels', canales => {
  var noselaverdad = document.createElement("a");
  noselaverdad.classList.add('dropdown-item');
  noselaverdad.innerHTML =  `<buttton class="btn btn-link" data-channel="${canales}">${canales}</button>`;
  document.querySelector("#menu").append(noselaverdad)
  boton_canal =document.querySelectorAll(".btn btn-link");
  boton_canal.forEach(button =>{
    button.onclick = () =>{
      localStorage.setItem("current_channel", button)
      var establecer_canal = button.dataset.channel;
      var mequedesinideas= localStorage.getItem("name");
      socket.emit('joined', establecer_canal, mequedesinideas);
    }
  })
})

socket.on('unirse al canal', data =>{
  localStorage.setItem("canal_actual", data.establecer_canal)
  alert(`Bienvenido a ${data.establecer_canal}`)

  var mensajespqyanosequehacer = data.channels[data.nombrecanal]
  
  for(i = 0; i <mensajespqyanosequehacer; i++){

    div = document.createElement('div');
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


document.querySelector("#enviar").onsubmit = () =>{
  const name_usuario = localStorage.getItem("name");
  const nombre_canal = localStorage.getItem("channel");
  const mensaje =  document.querySelector("#mensaje").value;

  const tiempo_instancia = new Date();

  const tiempo = tiempo_instancia.toLocaleString('es-ES', {hour:'numeric', minute: 'numeric', hour12: true})
  var fecha = tiempo_instancia.toDateString();
  fecha = fecha.slice(4, fecha.length);

  socket.emit('mensaje enviado', nombre_canal, name_usuario, mensaje, tiempo, fecha);
}

socket.on('mensaje recibido', recibido => {
  const nombrecanal = recibido.nombre_canal;
  
})
})

/*socket.on('connect', () => {

        socket.on('message', function(data) { 
          $('#lista').append('<h6 >' + name + '</h6><small>' + data + '</small>')  
          })
      
          $('#enviar').on('click', function() {
            socket.send($('#mensaje').val());
            $('#mensaje').val('');
          })

    });*/

