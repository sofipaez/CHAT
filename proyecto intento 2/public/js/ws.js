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
function enviarMensaje(){
    enviarMensajeGeneral(document.getElementById("message-input").value);
}