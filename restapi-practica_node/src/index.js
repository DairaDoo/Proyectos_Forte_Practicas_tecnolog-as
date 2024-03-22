const express = require('express');
const app = express(); // constante que se utiliza para ejecutar aplicación
// morgan es una función que procesa datos antes
// de ser recibidos por el servidor.
const morgan = require('morgan');


// Settings
app.set('port', 3000);

// Middlewares
app.use(morgan('combined'));
app.use(express.urlencoded({extended: false})); // ayuda a enteder datos que llegan desde formularios y otras cosas.
app.use(express.json()); // metodo json permite al servidor recibir formato json y entenderlo.


// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`); // el app.get(port) es técnicamente como una variable.
})