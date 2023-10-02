const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const {
    usersIndex,
    usersRegister,
    usersCreate
} = require('../controller/usersControllers');

router.get('/', usersIndex);

router.get('/registro', usersRegister);

router.post('/create',
    [
        check('nombre').isLength({min:4}),
        check('email').isEmail(),
        check('password').isLength({min:8})
    ]
    , usersCreate);

module.exports = router;
