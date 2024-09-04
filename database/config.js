


const mongoose=require ('mongoose');


//Conexion BC 
const dbConnection = async()=>{
    try {
    await mongoose.connect(process.env.DB_CNN);
    console.log('BD online ')
}catch(error){
    console.log(error);
    throw new Error ('Error con la BD')
}

}

module.exports={
    dbConnection
}