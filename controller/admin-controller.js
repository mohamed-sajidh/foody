const collection = require('../config/collection')
var objectId = require('mongodb').ObjectId
const { Db, ObjectId } = require("mongodb");
const userHelpers = require('../helpers/userHelpers');
const adminHelpers = require('../helpers/adminHelpers')
const { response } = require('../app');




module.exports = {

    adminLogin : ((req , res) => {
        res.render('admin/adminLogin')
    }),


    

    loginSubmit : ((req , res) => { 
        adminHelpers.doLogin(req.body).then(async (response) => {
            console.log(response , "aaaaaaaaaaaaaaaaaaaaa");
            if(response.status){
                res.render('admin/adminHome')
            }
        })
        .catch(() => {
            res.render('admin/adminLogin', { error: 'invalid username or password' })
        })
    }),


    productTable : ((req , res) => {
        res.render('admin/product')
    }),


    userTable : (async (req , res) => {
        let users =await adminHelpers.getAllUsers()
        res.render('admin/user' , {users})
    }),


    makeAdmin : ((req , res) => {
        let userId = req.query.id
        adminHelpers.makeAdmin(userId)
        res.redirect('/admin/userTable')
    }),


    nonAdmin : ((req , res) => {
        let userId = req.query.id
        adminHelpers.nonAdmin(userId)
        res.redirect('/admin/userTable')

    })



}