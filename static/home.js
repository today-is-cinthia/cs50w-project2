document.addEventListener('DOMContentLoaded',() => {
    var socket = io.connect(location.protocol+'//' + document.domain + ':' + location.port);
    localStorage.getItem("name")

document.querySelector("#salir").onclick = () =>{
  localStorage.getItem("name")
  localStorage.removeItem("name")
}

})

