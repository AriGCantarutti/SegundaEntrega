const mongoose = require('mongoose');
require('dotenv').config();

const MONGOLOCAL = process.env.MONGO_URL_LOCAL;
const MONGOATLAS = process.env.MONGO_URL_ATLAS;

const conexion = mongoose.connect(MONGOLOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Conexión a la base de datos establecida con éxito');
    }).catch(err => console.log(err));

module.exports = conexion;