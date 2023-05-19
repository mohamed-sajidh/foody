var express = require('express');
var router = express.Router();



const {adminLogin , loginSubmit , productTable , userTable , makeAdmin , nonAdmin} = require('../controller/admin-controller');


router.get('/' , adminLogin)

router.post('/adminLogin' , loginSubmit)

router.get('/product' , productTable)

router.get('/userTable' , userTable)

router.get('/makeAdmin' , makeAdmin)

router.get('/nonAdmin' , nonAdmin)

module.exports = router;
