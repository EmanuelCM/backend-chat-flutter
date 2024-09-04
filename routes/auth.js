

const { Router}=require ('express');
const { crearUsuario ,login,renewToken} = require('../controller/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router =Router();

router.post('/new',[
    check('terminal', 'El terminal debe comenzar con H y estar seguido de 6 dígitos').matches(/^H\d{6}$/),
    check('ruc','El ruc es obligatorio').isLength({min:11,max:11}).matches(/^\d{11}$/),
    check('email','El email es obligatorio').isEmail(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 6 caracteres, incluyendo un número y un carácter especial')
    .isLength({ min: 6 })
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#.?&]{6,}$/),
    validarCampos  //es un midelwhere que usamos para validar campos
],crearUsuario);

router.post('/',[
    check('terminal', 'El terminal debe comenzar con H y estar seguido de 6 dígitos').matches(/^H\d{6}$/),
    check('password', 'La contraseña debe tener al menos 6 caracteres, incluyendo un número y un carácter especial')
    .isLength({ min: 6 })
],login);


router.get('/renew',validarJWT,renewToken);

module.exports= router;