const IP = "ws://localhost:3000";
const socket = io(IP);

socket.on("connect", () =>{
    console.log("Me conecté a WS");
});


socket.on("server-message", data =>{
    console.log("Me llegó del servidor", data);
});

function funcionPrueba(){
    socket.emit("incoming-message", {mensaje: "PRUEBA"});
}

function Unirse(div){
    console.log(div.id)
    console.log(div.title)
    sala={
        chat:div.id,
        nombre_contacto:div.title,
    }
    socket.emit('room', sala)
    
}


function enviarMensaje(){
    enviarMensajeGeneral(document.getElementById("message-input").value);
}


socket.on("UnirmealChat",contacto => {
    console.log(contacto)
    //mensajesviejos()
    document.getElementById("nombre_contacto").innerHTML =`
    <h6> ${contacto} </h6>`
    document.getElementById("mensaje_enviado").innerHTML =`
    <p>${mensajes_usuario}</p>`
})
$(function(){
    // variables
    var message = $('#chat-message');
    var chat =('#chat');
    
    $('#message-box').sumbit(function(e){
        e.preventDefault();
        chat.append(message.val());
    });

});
