document.addEventListener('DOMContentLoaded', () =>{
    var socket = io.connect(location.protocol+'//' + document.domain + ':' + location.port);
    socket.on('connect', () => {

        socket.on('message', function(data) { 
            $('#lista').append('<li>' + data + '</li>')
          })
      
          $('#enviar').on('click', function() {
            socket.send($('#mensaje').val());
            $('#mensaje').val('');
          })
    });
})


document.querySelector("form").onsubmit = () =>{
  const name = document.querySelector("name").value;
}