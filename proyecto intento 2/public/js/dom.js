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
  
}

async function registro(data) {
  //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    

  try {
    const respuesta = await fetch("/registro", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    //En result obtengo la respuesta
    const resultado = await respuesta.json();
    console.log("Success:", result);

    if (resultado.completos == false) {
      alert("Por favor, completar todos los campos")
    } else {
        document.getElementById("form2").submit()
      //Envio el formularia desde dom para cambiar de pagina
      //Podria usar tambien un changeScreen()
    }

  } catch (error) {
    console.error("Error:", error);
  }
}

//Esta funcion la llama el boton Ingresar que tiene que ser type button para ejecutar el onclick
function registrarse() {
  let dni = document.getElementById("dni").value
  let usuario = document.getElementById("usuario").value
  let nombre_completo = document.getElementById("nombre_completo").value
  let gmail = document.getElementById("gmail").value
  let contraseña = document.getElementById("contraseña").value

  if (dni === "" || usuario === "" || nombre_completo === "" || gmail === "" || contraseña === "") {
      alert("Complete todos los campos antes de enviar el formulario");
  } else {
      let data = {
          dni: dni,
          usuario: usuario,
          nombre_completo: nombre_completo,
          gmail: gmail,
          contraseña: contraseña,
      }
      registro(data);
      location.href ='/nivel1';

  }
}

// javascript del juego

let flippedCards = [];
let lockBoard = false;
let pairsFound = 0;
let puntaje = 20;

function flipCard(card) {
  if (lockBoard) return;
  if (card === flippedCards[0]) return;

  card.classList.add('flip');

  if (flippedCards.length === 0) {
    flippedCards[0] = card;
  } else if (flippedCards.length === 1) {
    flippedCards[1] = card;
    lockBoard = true;
    checkMatch();
  }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function disableCards() {
  flippedCards[0].removeEventListener('click', handleCardClick);
  flippedCards[1].removeEventListener('click', handleCardClick);
  flippedCards = [];
  lockBoard = false;
}

function enableCards() {
  flippedCards[0].addEventListener('click', handleCardClick);
  flippedCards[1].addEventListener('click', handleCardClick);
  flippedCards = [];
  lockBoard = false;
}

function traerODS(ods){
  let idOds = ods
  fetchODS(idOds)
}

function checkMatch() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];
  let title = document.getElementById("nivel")

  const img1 = card1.querySelector('.card-back img');
  const img2 = card2.querySelector('.card-back img');

  let imageValue = parseInt(card1.getAttribute('data-value'));

  let actualLevel = parseInt(title.getAttribute('data-value'));
  devuelveDescripcion(actualLevel, imageValue, card1, card2, img1, img2)

}

async function fetchODS(id) {
  //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    
  let data = {
    id: id
  }
  try {
    const response = await fetch("/descripcion", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    //En result obtengo la respuesta
    const result = await response.json();
    //console.log("Success:", result[0].descripcion);
    return result[0].descripcion

  } catch (error) {
    console.error("Error:", error);
  }
}

async function devuelveDescripcion(nivel, id, card1, card2, img1, img2){
  let definicion = await fetchODS(id)
  if (nivel>= 2){
    puntaje = parseFloat(document.getElementById("puntajecito").innerHTML)
  }

  if (img1.src === img2.src) {
    disableCards();
    pairsFound++;
    puntaje += 10;
    document.getElementById("puntajecito").innerHTML = puntaje;
  
    Swal.fire({
      imageUrl: 'https://media-ed.fra1.digitaloceanspaces.com/204/Jkwf68zIcYH7rFDEN3wk0JbEK4zLHMBQwVhztUrm.png',
      imageHeight: 150,
      title: 'Correcto!',
      text: "ODS " + id + ": " + definicion
    }).then((result) => {
      if (nivel == 1){
        checkWin1();
      } else if (nivel == 2){
        checkWin2()
      } else if (nivel == 3){
        checkWin3()
      } else if (nivel == 4){
        checkWin4()
      } else if (nivel == 5){
        checkWin5()
      }
    });
  } else {
    setTimeout(() => {
      puntaje -= 5;
      document.getElementById("puntajecito").innerHTML = puntaje;
      card1.classList.remove('flip');
      card2.classList.remove('flip');
      enableCards();
    }, 1000);
  }
}

function shuffleAndDisplayCards(sectionId) {
  const cardsContainer = document.getElementById(sectionId);
  const cards = Array.from(cardsContainer.querySelectorAll('.card'));
  shuffleArray(cards);
  cardsContainer.innerHTML = ''; // Limpia el contenedor

  cards.forEach((card, index) => {
    card.addEventListener('click', handleCardClick);
    cardsContainer.appendChild(card);
  });
}

function resetCards() {
  flippedCards = [];
  lockBoard = false;
  pairsFound = 0;
}

function handleCardClick() {
  flipCard(this);
}

async function sumarPuntos() {
  let data = {
    puntaje : puntaje
  }
  try {
    const response = await fetch("/guardarPuntosParciales", {
      method: "POST", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

  } catch (error) {
    console.error("Error:", error);
  }
  
}

function checkWin1() {
  if (pairsFound === 6) { // Cambiar el número según la cantidad total de pares
    sumarPuntos()
    Swal.fire(
      'Felicitaciones!',
      'Pasaste al nivel 2',
      'success'
    ).then((result) => {
      location.href ='/nivel2';
    });
    
    // agregar más acciones cu+ando se gana el juego
  }
}

function checkWin2() {
  if (pairsFound === 6) { // Cambiar el número según la cantidad total de pares
    sumarPuntos()
    Swal.fire(
      'Felicitaciones!',
      'Pasaste al nivel 3',
      'success'
    ).then((result) => {
      location.href ='/nivel3';
    });
    // agregar más acciones cu+ando se gana el juego
  }
}

function checkWin3() {
  if (pairsFound === 8) { // Cambiar el número según la cantidad total de pares
    sumarPuntos()
    Swal.fire(
      'Felicitaciones!',
      'Pasaste al nivel 4',
      'success'
    ).then((result) => {
      location.href ='/nivel4';
    });
    // agregar más acciones cu+ando se gana el juego
  }
}

function checkWin4() {
  if (pairsFound === 8) { // Cambiar el número según la cantidad total de pares
    sumarPuntos()
    Swal.fire(
      'Felicitaciones!',
      'Pasaste al nivel 5',
      'success'
    ).then((result) => {
      location.href ='/nivel5';
    });
    // agregar más acciones cu+ando se gana el juego
  }
}

function checkWin5() {
  if (pairsFound === 10) { // Cambiar el número según la cantidad total de pares
    sumarPuntos()
    Swal.fire(
      'Felicitaciones!',
      'Pasaste el nivel 5',
      'success'
    ).then((result) => {
      location.href ='/jugadores';
    });
    // agregar más acciones cu+ando se gana el juego
  }
}

document.addEventListener('DOMContentLoaded', function () {
  let title = document.getElementById("nivel")
  let actualLevel = parseInt(title.getAttribute('data-value')); 
  if (actualLevel == 1) {
    document.getElementById("puntajecito").innerHTML=puntaje    
  }else {
    document.getElementById("puntajecito").innerHTML = parseFloat(document.getElementById("puntajecito").innerHTML)
  }
  
  resetCards();
  shuffleAndDisplayCards('nivelx');
});

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





