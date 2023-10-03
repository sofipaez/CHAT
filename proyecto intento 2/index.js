
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


app.listen(Listen_Port, function() {
    console.log('Servidor NodeJS corriendo en http://localhost:' + Listen_Port + '/');
});

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
    req.session.puntaje = 0
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
        if(req.body.usuario_login=="sopa" && req.body.contraseña_login=="123"){
            res.redirect('/admin');
        }else if(usuarios[i].usuario == req.body.usuario_login && usuarios[i].contraseña == req.body.contraseña_login){
            res.render('nivel1', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
        }
    }
});


app.put('/login', async function(req, res)
{
    //Petición POST con URL = "/login"
    console.log("Soy un pedido PUT", req.body); 
    //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método POST
    let admin=false

    let respuesta= await MySQL.realizarQuery(`SELECT * FROM Usuarios WHERE usuario = "${req.body.usuario_login}" AND contraseña="${req.body.contraseña_login}"` )
    console.log(respuesta)
    if (respuesta.length>0){
        if (req.body.usuario_login == "sopa") {
            res.send({validar:true, admin:true})    
        }
        else{
            res.send({validar:true, admin:false})    
        }
        
    } else{
        res.send({validar:false})
    }
});

app.delete('/login', function(req, res) {
    //Petición DELETE con URL = "/login"
    console.log("Soy un pedido DELETE", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método DELETE
    res.send(null);
});

app.get('/registro',function(req, res){
    //Petición GET con URL = "/login"
    console.log("Soy un pedido GET, voy al registro", req.query); 
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('registro', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.post('/registro', async function(req, res)
{
    //Petición POST con URL = "/login"
    console.log("Soy un pedido POST", req.body);  //Renderizo página "home" sin pasar ningún objeto a Handlebars
    console.log(await (MySQL.realizarQuery("SELECT * FROM Usuarios")))
    //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método POST
});

app.put('/registro', async function(req, res) {
    console.log("Soy un pedido PUT /registro", req.body);
    await MySQL.realizarQuery(`INSERT INTO Usuarios(id_usuario,usuario,nombre_completo,gmail,contraseña) VALUES("${req.body.dni}","${req.body.usuario}", "${req.body.nombre_completo}", "${req.body.gmail}", "${req.body.contraseña}") `)
    console.log(await MySQL.realizarQuery("SELECT * FROM Usuarios"));
    res.render('registro', null);
});

app.delete('/registro', function(req, res) {
    console.log("Soy un pedido DELETE", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método DELETE
    res.send(null);
});




app.get('/nivel1', function(req, res){
    //Petición GET con URL = "/login"
    console.log("Soy un pedido GET , VOY AL LOGIN", req.query); 
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('nivel1', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.get('/admin',function(req, res){
    //Petición GET con URL = "/login"
    console.log("Soy un pedido GET, voy al admin", req.query); 
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('admin', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.delete('/admin', function(req, res) {
    //Petición DELETE con URL = "/login"
    console.log("Soy un pedido DELETE", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método DELETE
    res.send(null);
});

app.post('/admin_ods', async function(req, res)
{
    //Petición POST con URL = "/login"
    await MySQL.realizarQuery(`UPDATE Casillas SET descripcion = "${req.body.descripcion_ods}" WHERE id_ods="${req.body.id_ods_admin}";`)
    console.log(await (MySQL.realizarQuery("SELECT * FROM Casillas")));
    res.redirect('/')
    //res.render('inicio', null);
    //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método POST
    //res.render('home', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.delete('/admin_ods', function(req, res) {
    //Petición DELETE con URL = "/login"
    console.log("Soy un pedido DELETE", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método DELETE
    res.send(null);
});

app.post('/admin_puntaje', async function(req, res)
{
    //Petición POST con URL = "/login"
    console.log(req.body.dni_admin);
    await MySQL.realizarQuery(`UPDATE Juego SET puntuacion_max = 0 WHERE id_usuario="${req.body.dni_admin}";`);
    console.log(await (MySQL.realizarQuery("SELECT * FROM Juego")));
    res.redirect('/')
    //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método POST
    //res.render('home', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.delete('/admin_puntaje', function(req, res) {
    //Petición DELETE con URL = "/login"
    console.log("Soy un pedido DELETE", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método DELETE
    res.send(null);
});

app.put ('/descripcion', async function(req, res){
    let response = await MySQL.realizarQuery(`SELECT descripcion FROM Casillas WHERE id_ods="${req.body.id}";`)
    res.send(response);
})


app.get('/jugadores',async function(req, res){
    //Petición GET con URL = "/login"
    console.log("Soy un pedido GET, voy a la tabla", req.query); 
    let id_usuario = await MySQL.realizarQuery(`SELECT id_usuario FROM Usuarios WHERE usuario="${req.body.usuario}";`)
    console.log(id_usuario);
    await MySQL.realizarQuery(`UPDATE Juego SET puntuacion_max = "${req.session.puntaje}" WHERE id_usuario=${req.body.id_usuario};`)
    console.log(await (MySQL.realizarQuery(`SELECT * FROM Juego;`)));
    let nombre_usuario= await MySQL.realizarQuery(`SELECT puntuacion_max,usuario FROM Juego INNER JOIN Usuarios ON Usuarios.id_usuario = Juego.id_usuario ORDER BY puntuacion_max DESC`)
    console.log(nombre_usuario);
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('jugadores',{usuarios:nombre_usuario});
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
});


app.get('/nivel2', function(req, res){
    //Petición GET con URL = "/login"
    console.log("Soy un pedido GET , VOY AL LOGIN", req.query); 
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('nivel2', {puntaje: req.session.puntaje}); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.get('/nivel3', function(req, res){
    //Petición GET con URL = "/login"
    console.log("Soy un pedido GET , VOY AL LOGIN", req.query); 
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('nivel3', {puntaje: req.session.puntaje}); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.get('/nivel4', function(req, res){
    //Petición GET con URL = "/login"
    console.log("Soy un pedido GET , VOY AL LOGIN", req.query); 
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('nivel4', {puntaje: req.session.puntaje}); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.get('/nivel5', function(req, res){
    //Petición GET con URL = "/login"
    console.log("Soy un pedido GET , VOY AL LOGIN", req.query); 
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('nivel5', {puntaje: req.session.puntaje}); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});


app.post('/guardarPuntosParciales',  function (req,res) {
    req.session.puntaje = req.body.puntaje
    console.log(req.session.puntaje)
    res.send(null) 
});