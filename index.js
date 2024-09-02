
const express = require ('express');
const path = require ('path');
// dentro podemos mandar configuraciones al paquete  pero asi lo que hace es leer lo que se tiene en el archivo 
require ('dotenv').config();
// App Express
const app =express();


// NODE SERVER  
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');



// path publico 
const publicPacth = path.resolve(__dirname,'public');
app.use(express.static(publicPacth));


server.listen(process.env.PORT,(err)=>{

    if (err)throw Error(err);
    console.log('Servidor corriendo en puerto!',process.env.PORT);
})
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});



const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));



