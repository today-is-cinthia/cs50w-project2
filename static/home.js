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

})

var listadebotones = document.getElementsByClassName("btn btn-link")
for(var i= 0; i< listadebotones.length; i++){
  listadebotones[i].addEventListener('click', function(){
    botoncanal = this.value
    localStorage.setItem("currentchannel", botoncanal)
    alert("¡  You have joined to " +localStorage.getItem("currentchannel") + "  !  🥰")
    document.querySelector("#enviar").disabled=false;
    let nomcanal = document.querySelector("#canal")
    nomcanal.innerHTML = localStorage.getItem("currentchannel")
  })
}


socket.on('connect', () =>{
  document.querySelector("#enviar").onclick = () =>{
    elmensaje= document.querySelector("#mensaje").value
    var canalstorage = localStorage.getItem("currentchannel")
    socket.emit('add message', elmensaje, canalstorage)
  }
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


})
