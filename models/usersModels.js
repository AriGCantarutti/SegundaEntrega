const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userShema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('users', userShema);