var express = require('express');
var router = express.Router();



const {userHome , userLogin , signup , signupButton , loginSubmit} = require('../controller/user-controller');


router.get('/' , userHome)

router.get('/login' , userLogin)

router.get('/userSignup' , signup)

router.post('/signup' , signupButton)

router.post('/loginSubmit' , loginSubmit)

module.exports = router;
