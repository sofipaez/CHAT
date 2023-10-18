const IP = "ws://localhost:3000";
const socket = io(IP);

socket.on("connect", () =>{
    console.log("Me conecté a WS");
});


socket.on("server-message", data =>{
    console.log("Me llegó del servidor", data);
        console.log(data)
        document.getElementById("mensajesviejos").innerHTML+=  `<div id="mensaje_enviado" class="message sent">
            <p>${data.mensaje}</p>
             </div>`;
        
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
    nuevomensaje=document.getElementById("message-input").value
    if (nuevomensaje !=""){
        data={
            mensaje:nuevomensaje
        }
        socket.emit("incoming-message", {mensaje:nuevomensaje});
        document.getElementById("message-input").value="";
    } }
    


socket.on("UnirmealChat",contacto => {
    console.log(contacto)
    mensajesviejos()
    document.getElementById("nombre_contacto").innerHTML =`
    <h6> ${contacto} </h6>`
    
    
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