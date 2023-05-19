const collection = require('../config/collection')
var objectId = require('mongodb').ObjectId
const { Db, ObjectId } = require("mongodb");
const userHelpers = require('../helpers/userHelpers');
const { response } = require('../app');







module.exports = {


    userHome : ((req , res) => {
        res.render('user/userHome')
    }),


    userLogin : ((req , res) => {
        res.render('user/login')
    }),


    signup : ((req , res) => {
        res.render('user/signup')
    }), 


    signupButton : ((req , res) => {
        userHelpers.dosignUp(req.body).then((response) => {

            res.redirect('/login')
        })
    }),


    loginSubmit : ((req , res) => {
        userHelpers.doLogin(req.body).then((response) => {
            if(response.status){
                res.redirect('/')
            }
           
        })
        .catch(() => {
            res.render('user/login', { error: 'invalid username or password' })
        })
    })

}