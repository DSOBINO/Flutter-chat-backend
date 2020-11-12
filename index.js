const { Console } = require('console');
const express = require('express');
const path = require('path');
require('dotenv').config();

const { dbConnection } = require('./database/config');
dbConnection();

//App de Express
const app = express();

// Node Server 
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);


//Mensajes de sockets

require('./sockets/socket');
  
app.use( express.json() );


const publicPath = path.resolve( __dirname, 'public');

app.use( express.static(publicPath));

// Mis Rutas
app.use( '/api/login', require('./routes/auth') );


server.listen (process.env.PORT, (err) => {


    if (err) throw new Error(err);

    console.log('Servidor corriendo en puertooo', process.env.PORT);

});