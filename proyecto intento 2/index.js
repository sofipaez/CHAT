
/*  Paquetes instalados: -g nodemon, express, express-handlebars, body-parser, mysql2
    Agregado al archivo "package.json" la línea --> "start": "nodemon index"
    
    Proyecto "Node_base"
    Desarrollo de Aplicaciones Informáticas - 5to Informática
    
    Docentes: Nicolás Facón, Martín Rivas, Federico Paul
    
    Revisión 1 - Año 2021
*/
//Cargo librerías instaladas y necesarias
const express = require('express'); //Para el manejo del servidor Web
const exphbs  = require('express-handlebars'); //Para el manejo de los HTML
const bodyParser = require('body-parser'); //Para el manejo de los strings JSON
const MySQL = require('./modulos/mysql'); //Añado el archivo mysql.js presente en la carpeta módulos
const session = require('express-session'); //Para usar variables de sesión

const app = express(); //Inicializo express para el manejo de las peticiones

app.use(express.static('public')); //Expongo al lado cliente la carpeta "public"

app.use(bodyParser.urlencoded({ extended: false })); //Inicializo el parser JSON
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'})); //Inicializo Handlebars. Utilizo como base el layout "Main".
app.set('view engine', 'handlebars'); //Inicializo Handlebars

const Listen_Port = 3000; //Puerto por el que estoy ejecutando la página Web


const server = app.listen(Listen_Port, function() {
    console.log('Servidor NodeJS corriendo en http://localhost:' + Listen_Port + '/');
});

const io = require('socket.io')(server);

const sessionMiddleware = session({
    secret: 'panchosveganos',
    resave: true,
    saveUninitialized: false,
})
app.use(sessionMiddleware)

io.use(function(socket,next) {
    sessionMiddleware(socket.request, socket.request.res, next);
})

app.use(session({secret: '123456', resave: true, saveUninitialized: true})); 
/*
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
*/

app.get('/', function(req, res)
{
    //Petición GET con URL = "/", lease, página principal.
    req.session.usuario_login = 0
    console.log(req.query); //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('inicio', null); //Renderizo página "login" sin pasar ningún objeto a Handlebars
});

app.get('/login', function(req, res){
    //Petición GET con URL = "/login"
    console.log("Soy un pedido GET , VOY AL LOGIN", req.query); 
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('login', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.post('/login', async function(req, res)
{
    //Petición POST con URL = "/login"
    console.log("Soy un pedido POST", req.body); 
    //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método POST
    let usuarios =  await MySQL.realizarQuery("SELECT * FROM Usuarios")
    for(let i = 0;  i < usuarios.length; i++){
        if(usuarios[i].usuario == req.body.usuario_login && usuarios[i].contraseña == req.body.contraseña_login){
            res.render('chats', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
        }
    }
});


app.put('/login', async function(req, res)
{
    //Petición POST con URL = "/login"
    console.log("Soy un pedido PUT", req.body); 
    //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método POST
    let admin=false
    req.session.idUser = req.body.usuario_login
    let respuesta= await MySQL.realizarQuery(`SELECT * FROM Contactos WHERE IDContacto = "${req.body.usuario_login}" AND Password="${req.body.contraseña_login}"` )
    console.log(respuesta)
    if (respuesta.length>0){
            res.send({validar:true, admin:false})
        
        
    } else{
        res.send({validar:false})
    }
    console.log(req.session.idUser)
});

app.delete('/login', function(req, res) {
    //Petición DELETE con URL = "/login"
    console.log("Soy un pedido DELETE", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método DELETE
    res.send(null);
});

app.get('/chats',async function(req, res){
    //Petición GET con URL = "/login"
    console.log("Soy un pedido GET, voy al CHAT", req.query); 
    let chats= await MySQL.realizarQuery(`select NombreChat,Chats.IDChat FROM Chats INNER JOIN Contactos_Chats ON Chats.IDChat = Contactos_Chats.IDChat WHERE IDContacto = "${req.session.idUser}";`)
    console.log(chats);
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('chats',{contactos:chats});
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
     //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.post('/chats', async function(req, res)
{
    //Petición POST con URL = "/login"
    console.log("Soy un pedido POST", req.body);  //Renderizo página "home" sin pasar ningún objeto a Handlebars
    //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método POST
});

app.put('/chats', async function(req, res) {
    console.log("Soy un pedido PUT /registro", req.body);
    res.render('chats', null);
    
});

app.delete('/chats', function(req, res) {
    console.log("Soy un pedido DELETE", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método DELETE
    res.send(null);
});

io.on("connection", (socket) => {
    const req = socket.request;
    // es igual al app.get y al app.post 
    socket.on('incoming-message', data => {
        console.log("INCOMING MESSAGE:", data);
        io.emit("server-message", {mensaje: "MENSAJE DEL SERVIDOR"});
    });

    socket.on('room', async (sala) => {
        socket.join("room"+sala.chat)
        chatid=sala.chat
        contacto=sala.nombre_contacto
        let mensajes_viejos=await MySQL.realizarQuery(`select mensaje from Mensajes inner join Chats on Mensajes.IDChat =  Chats.IDChat where Chats.IDChat = "${chatid}"`)
        console.log(mensajes_viejos)
        let mensajes_usuario= await MySQL.realizarQuery(`select mensaje from Mensajes inner join Chats on Mensajes.IDChat =  Chats.IDChat where Chats.IDChat = "${chatid}" and IDContacto= "${req.session.idUser}"; `)
        console.log(mensajes_usuario)
        req.session.room="room"+sala.chat;
        io.to(req.session.room).emit('UnirmealChat', contacto, mensajes_viejos,mensajes_usuario )
        

       
    })
});

setInterval (() => io.emit("server-message", {mensaje: "MENSAJE DEL SERVIDOR"}), 2000);

