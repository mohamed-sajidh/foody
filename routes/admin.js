var express = require('express');
var router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/food-images')
    },
    filename: function (req, files, cb) {
      cb(null, Date.now() + '-' + files.originalname)
    }
  })
const upload = multer({ storage: storage });



const {adminLogin , loginSubmit , productTable , userTable , makeAdmin , nonAdmin , logout , addProduct , addProductSubmit , editProduct} = require('../controller/admin-controller');
const { route } = require('./user');


router.get('/' , adminLogin)

router.post('/adminLogin' , loginSubmit)

router.get('/product' , productTable)

router.get('/userTable' , userTable)

router.get('/makeAdmin' , makeAdmin)

router.get('/nonAdmin' , nonAdmin)

router.get('/logout' , logout)

router.get('/add-product' , addProduct)

router.post('/add-product-submit' ,upload.fields( [ { name : 'image1' , maxCount : 1 } , { name : 'image2' , maxCount : 1 } ] ), addProductSubmit)

router.get('/edit' , editProduct)

module.exports = router;
