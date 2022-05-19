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
  localStorage.setItem("channel", canales)
}

localStorage.getItem("channel")

socket.on('connect', () =>{
  
  socket.on('message', function(data) { 
    $('#lista').append('<h6 >' + name + '</h6><small>' + data + '</small>')  
    })

    $('#enviar').on('click', function() {
      socket.send($('#mensaje').val());
      $('#mensaje').val('');
    })

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

