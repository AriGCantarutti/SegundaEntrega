
const { validationResult } = require('express-validator');

const usersIndex = (req, res) => {
    res.render('index.html');
}

const usersRegister = (req, res) => {
    res.render('registro.html');
}

const usersCreate = (req, res) => {
    const errores = validationResult(req)
    
    if(!errores.isEmpty()){
        console.log('Existe un error de validación');
        res.render('error.html');
        res.json({errores: errores})
    }
    
    const {nombre, email, password } = req.body;

    console.log(`Datos recibidos ${nombre} - ${email} - ${password}`);
    res.render('admin.html')

    res.json({
        nombre,
        email,
        password
    })
    
}

module.exports = {
    usersIndex,
    usersRegister,
    usersCreate
}

