const { ObjectId } = require('mongodb');
const { response } = require('../app');
let collection = require('../config/collection')
const db = require('../config/connection')
const bcrypt = require('bcrypt');


module.exports = {



    doLogin : (loginData) => {

        return new Promise(async (resolve , reject) => {
            let response = {}

            let admin = await db.get().collection(collection.USER_COLLECTION).findOne({email : loginData.email})

            if(admin){
                bcrypt.compare(loginData.password, admin.password).then((status) => {
                    if(status){
                        console.log("login success");
                        response.admin = admin
                        response.status = true
                        resolve(response)
                    }
                    else{
                        console.log("login failed");
                        reject({ status: false })
                    }
                })
            }
            else{
                console.log("login failed ...................");
                reject({ status: false })
            }
        })
    },


    getAllUsers : () => {
        return new Promise(async (resolve , reject) => {
            let users =await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(users)
        })
    },


    makeAdmin : (userId) => {
        return new Promise((resolve , reject) => {
            db.get().collection(collection.USER_COLLECTION).updateOne({_id : ObjectId(userId)} , {$set : {isAdmin : true}}).then((response) => {
                resolve(response)
            })
        })
    },


    nonAdmin : (userId) => {
        return new Promise((resolve , reject) => {
            db.get().collection(collection.USER_COLLECTION).updateOne({_id : ObjectId(userId)} , {$set : {isAdmin : false}}).then((response) => {
                resolve(response)
            })
        })
    }

    
}