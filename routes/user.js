var express = require('express');
var router = express.Router();



const {userHome , userLogin , signup , signupButton , loginSubmit , arabian , chinese , indian} = require('../controller/user-controller');


router.get('/' , userHome)

router.get('/login' , userLogin)

router.get('/userSignup' , signup)

router.post('/signup' , signupButton)

router.post('/loginSubmit' , loginSubmit)

router.post('/arabian' , arabian)

router.post('/chinese' , chinese)

router.post('/indian' , indian)



module.exports = router;
