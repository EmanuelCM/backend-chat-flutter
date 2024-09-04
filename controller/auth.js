const { response } = require("express");
const bcrypt=require('bcryptjs');
const User=require('../models/user')

const { validationResult, body } = require('express-validator');
const { generarJWT } = require("../helpers/jwt");



//! Crear Usuario
const crearUsuario= async (req,res=response)=>{

    const {terminal,password}=req.body;   
    try {
        const existeTerminal=await User.findOne({ terminal });
        if (existeTerminal){
            return res.status(400).json({
                ok: false,
                msg: 'El terminal ya está registrado'
            });
        }
        const user= new User(req.body);
        //Encriptar contrasena 
        const salt=bcrypt.genSaltSync();
        user.password=bcrypt.hashSync(password,salt);
        await user.save();

// Generar mi Json web token
const token=await generarJWT(user.id);
        res.json({
            ok:true,
            user,
            token
    });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//! Login
const login = async (req,res=response)=>{
    const{terminal,password}=req.body;
    //Validar usuario
    try {
    const userDB= await User.findOne({terminal});   
    if(!userDB){
        return res.status(404).json({
            ok:false,
            msg:'Email no encontrado'
        })
    }
    const validPassword = bcrypt.compareSync(password,userDB.password);
    if (!validPassword){
        return res.status(400).json({
            ok:false,
            msg:'Password Invalidad'
        })
    }
    //Generar el JWT
    const token = await generarJWT(userDB.id);
    res.json({
        ok:true,
        user:userDB,
        token
    })
  } catch (error) {
            console.log(error);            
            return res.status(500).json({
             ok:false,
            msg:'hable con el admministrador'
            } )
    }
    
    
    
}

//! re validar  Token por ID 
const renewToken  =async (req,res=response)=>{
    
    const uid= req.uid;
    const token = await generarJWT(uid);
    const user = await User.findById(uid);

    res.json({
        ok:true,
        user,
        token
    })

}


module.exports={
    crearUsuario,
    login,
    renewToken
}