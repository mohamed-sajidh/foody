const collection = require('../config/collection')
var objectId = require('mongodb').ObjectId
const { Db, ObjectId } = require("mongodb");
const userHelpers = require('../helpers/userHelpers');
const { response } = require('../app');





module.exports = {


    userHome : (async (req , res) => {
        let food = await userHelpers.getAllFood()
        res.render('user/userHome' , {food})
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
    }),


    arabian : (async (req , res) => {
        let obj = req.body
        let cat = obj.category

        let food =await userHelpers.getfood(cat)
        res.render('user/userHome' , {food})
    }),


    chinese : (async (req , res) => {
        let obj = req.body
        let cat = obj.category

        let food =await userHelpers.getfood(cat)
        res.render('user/userHome' , {food})
    }),


    indian : (async (req , res) => {
        let obj = req.body
        let cat = obj.category

        let food =await userHelpers.getfood(cat)
        res.render('user/userHome' , {food})
    })

}

