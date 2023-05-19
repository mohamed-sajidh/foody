const collection = require('../config/collection')
var objectId = require('mongodb').ObjectId
const { Db, ObjectId } = require("mongodb");
const userHelpers = require('../helpers/userHelpers');
const adminHelpers = require('../helpers/adminHelpers')
const { response } = require('../app');
const fs = require('fs')



module.exports = {

    adminLogin : ((req , res) => {
        res.render('admin/adminLogin')
    }),


    

    loginSubmit : ((req , res) => { 
        adminHelpers.doLogin(req.body).then(async (response) => {
            if(response.status){
                if(response.admin.isAdmin){
                    let admin = response
                    res.render('admin/adminHome' , {admin})
                }else{
                    res.render('admin/adminLogin', { error: 'you are not admin' })
                }
            }
        })
        .catch(() => {
            res.render('admin/adminLogin', { error: 'invalid username or password' })
        })
    }),


    productTable : (async (req , res) => {
        let product = await adminHelpers.getAllProduct()
        res.render('admin/product' , { product })
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

    }),


    logout : ((req , res) => {
        res.redirect('/admin/')
    }),


    addProduct : ((req , res) => {
        res.render('admin/addProduct')
    }),


    addProductSubmit : ((req , res) => {
        req.body.img1 = req.files.image1[0].filename
        req.body.img2 = req.files.image2[0].filename

        adminHelpers.addProduct(req.body).then((response) => {
            res.redirect('/admin/product')

        })

    }),


    editProduct : (async (req , res) => {
        let product = await adminHelpers.productDetails(req.body.id)
        res.render('admin/edit')
    })



}