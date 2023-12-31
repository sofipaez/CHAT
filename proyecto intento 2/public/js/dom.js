async function putJSON(data) {
    //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    

    try {
      const response = await fetch("/login", {
        method: "PUT", // or 'POST'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      //VAMOS A VER EL ARMADO DEL APP.PUT('/LOGIN') EN EL INDEX
      //En result obtengo la respuesta
      const result = await response.json();
      console.log("Success:", result);

      if (result.validar == false) {
        alert("Los datos son incorrectos")
      } else {
        
          location.href ='/chats';
        
        //Envio el formularia desde dom para cambiar de pagina
        //Podria usar tambien un changeScreen()
      }

    } catch (error) {
      console.error("Error:", error);
    }
}

  //Esta funcion la llama el boton Ingresar que tiene que ser type button para ejecutar el onclick
function login() {
  //Leo los datos del input
  let usuario = document.getElementById("usuario_login").value
  let contraseña = document.getElementById("contraseña_login").value

  //Creo un objeto de forma instantanea
  let data = {
    usuario_login: usuario,
    contraseña_login: contraseña
  }
  //data es el objeto que le paso al back
  putJSON(data)
  // DE ACA DIRIGIRSE AL FETCH putJSON() que esta más arriba
}


var data = {
  messages: [
    { message: 'Hola, ¿cómo estás?', isUser: true },
    { message: '¡Hola! Estoy bien, gracias.', isUser: false },
    { message: '¿En qué puedo ayudarte?', isUser: false },
  ]
};

var source = document.getElementById("chat-template").innerHTML;
var template = Handlebars.compile(source);
var html = template(data);
document.getElementById("chat-container").innerHTML = html;

async function mensajesviejos(idChat) {
  // Pasa el ID del chat como argumento para la función

  // Limpia los mensajes anteriores antes de cargar los nuevos
  document.getElementById("mensajesviejos").innerHTML = "";

  try {
    const response = await fetch("/mensajesantiguos", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ validar: true, idChat: idChat }), // Envía el ID del chat
    });
    //VER EN EL INDEX LA PARTE DEL APP.PUT('mensajesantiguos')

    // En result obtengo la respuesta
    const result = await response.json();
    console.log("Success:", result);
    let contacto = result.idcontacto;
    console.log("mensajes", result.mensajes);
    let mostrarmensajes = ``;
    for (let i = 0; i < result.mensajes.length; i++) {
      const element = result.mensajes[i];
      if (element.IDContacto != contacto) {
        mostrarmensajes = `<div id="mensaje_recibido" class="message received">
          <p>${element.mensaje}</p>
        </div>`;
      } else {
        mostrarmensajes = `<div id="mensaje_enviado" class="message sent">
          <p>${element.mensaje}</p>
        </div>`;
      }
      document.getElementById("mensajesviejos").innerHTML += mostrarmensajes;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}