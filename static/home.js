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

  localStorage.setItem("channel", canales)
}

localStorage.getItem("channel")

socket.on('display channels', canales => {
  var noselaverdad = document.createElement("a");
  noselaverdad.innerHTML = ''
})

/*socket.on('connect', () =>{
  
  socket.on('message', function(data) { 
    $('#lista').append('<h6 >' + name + '</h6><small>' + data + '</small>')  
    })

    $('#enviar').on('click', function() {
      socket.send($('#mensaje').val());
      $('#mensaje').val('');
    })

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

