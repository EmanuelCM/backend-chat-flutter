


const {io}= require('../index');

const Bands=require ('../models/bands');
const Band = require('../models/band');

const bands=new Bands();


bands.addBand( new Band('Queen'));
bands.addBand( new Band('Bon Jovi'));
bands.addBand( new Band('Herues del Silencio'));
bands.addBand( new Band('Sebitas'));
 console.log(bands);
// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado');

    client.emit('active-bands',bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente desconectado   ');
    });
    
    client.on('mensaje',(payload)=> {
        console.log('Mensaje!!',payload); 
        io.emit('mensaje',{admin:"Nuevo mensaje"})
    });
//
    client.on('emitir-mensaje',(payload)=>{
        // de esta manera emite para todos asi como para el emisor 
        // io.emit('emitir-mensaje',payload);
        // esto emite a todos menos al emisor 
        client.broadcast.emit('emitir-mensaje',payload);
    });

    client.on('vote-band', (payload)=>{
        bands.voteBand(payload.id);
        console.log(payload.id);
        io.emit('active-bands',bands.getBands());

    });

    client.on('add-band', (payload)=>{  
        
        bands.addBand(new Band(payload.name));
        //  io.emit('add-band');
        io.emit('active-bands',bands.getBands());

    });

    client.on('delete-band',(payload)=>{
        console.log(payload.id);
        bands.deleteBand(payload.id);
        io.emit('active-bands',bands.getBands());
    });

//
  });
