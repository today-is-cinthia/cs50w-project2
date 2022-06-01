document.addEventListener('DOMContentLoaded', () => {
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    var name = localStorage.getItem("name")
    var canal_storage = localStorage.getItem("currentchannel")

    //borrar del almacenamiento nombre al salir
    document.querySelector("#salir").onclick = () => {
        localStorage.getItem("name")
        localStorage.removeItem("name")
    }
    document.querySelector("#createchanel").onclick = () => {
        var canales = document.querySelector("#channel").value

        socket.emit('add channel', canales)

    }


    socket.on('display channels', canales => {
        var noselaverdad = document.createElement("a");
        noselaverdad.classList.add('dropdown-item');
        noselaverdad.innerHTML = `<buttton class="btn btn-link" data-channel="${canales}">${canales}</button>`;
        document.querySelector("#menu").append(noselaverdad)

    })

    var listadebotones = document.getElementsByClassName("btn btn-link")
    for (var i = 0; i < listadebotones.length; i++) {
        listadebotones[i].addEventListener('click', function() {
            botoncanal = this.value
            console.log(botoncanal)
            localStorage.setItem("currentchannel", botoncanal)
            alert("¡  You have joined to " + localStorage.getItem("currentchannel") + "  !  🥰")
            document.querySelector("#enviar").disabled = false;
            let nomcanal = document.querySelector("#canal")
            nomcanal.innerHTML = localStorage.getItem("currentchannel")
            mensaje = document.querySelector("#lista")
            mensaje.innerHTML = ""
            socket.emit('display messages', localStorage.getItem("currentchannel"))
        })
    }
1
    socket.on('display html messages', function(messages){
        recibirmensajes = document.querySelector("#listarecibido")
        mismensajes = document.querySelector("#lista")
        recibirmensajes.innerHTML = "";
        for(var i=0; i < messages.length; i++){
            let nameguardado = messages[i][0]
            let mensajeguardado = messages[i][1]
            let timeguardado = messages[i][2]
            if (nameguardado == localStorage.getItem("name")){
                mismensajes.innerHTML += '<br><h6 >' + nameguardado + '</h6><small>' + mensajeguardado + '</small><br><small>' + timeguardado + '</small>'
            }
            else{
            recibirmensajes.innerHTML += '<br><h6 >' + nameguardado + '</h6><small>' + mensajeguardado + '</small><br><small>' + timeguardado + '</small>'
            }
        }
    })

    socket.on('connect', () => {
        document.querySelector("#enviar").onclick = () => {
            elmensaje = document.querySelector("#mensaje").value
            var canalstorage = localStorage.getItem("currentchannel")
         //   socket.emit('add message', elmensaje, canalstorage)
        }
    })

    if (canal_storage == undefined) {
        document.querySelector("#enviar").disabled = true;
    }

    socket.on('connect', () => {

        socket.on('message', function(datos) {
            const time = new Date().toLocaleString()
            console.log(datos["name"])

            if (datos["name"] == name) {
                $('#lista').append('<h6 >' + datos["name"] + '</h6><small>' + datos["data"] + '</small><br><small>' + time + '</small>')
            } else {
                $('#listarecibido').append('<br><h6 >' + datos["name"] + '</h6><small>' + datos["data"] + '</small><br><small>' + time + '</small>')
            }


        })

        $('#enviar').on('click', function() {
            const time = new Date().toLocaleString()
            socket.send($('#mensaje').val(), name,time,localStorage.getItem("currentchannel"));
            $('#mensaje').val('');
        })

    });

    //   socket.on('display messages', function(diccionario){
    //   document.querySelector("#")
    //})

})