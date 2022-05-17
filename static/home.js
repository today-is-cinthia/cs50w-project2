document.addEventListener('DOMContentLoaded',() => {
    var socket = io.connect(location.protocol+'//' + document.domain + ':' + location.port);

var name = localStorage.getItem("name")

document.querySelector("#salir").onclick = () =>{
  localStorage.getItem("name")
  localStorage.removeItem("name")
}
document.querySelector("#createchanel").onclick = () =>{
  var canales = document.querySelector("#channel").value
  localStorage.setItem("channel", canales)
}
localStorage.getItem("canales")

socket.on('connect', () = {
  socket.on('add channel',function(data){
    $('#menu').append('<a class="dropdown-item" href="#">' + data["channel"] +'</a>' )
  })
  $('#createchanel').on('click', function() {
    socket.emit($('#channel').val());
    $('#channel').val('');
  })
})

const boton = document.querySelector('#enviar')
boton.disabled=true;

socket.on('connect', () => {

        socket.on('message', function(data) { 
          $('#lista').append('<div class="lista"><h6 >' + name + '</h6><small>' + data + '</small></div>')  
          })
      
          $('#enviar').on('click', function() {
            socket.send($('#mensaje').val());
            $('#mensaje').val('');
          })

    });
})

