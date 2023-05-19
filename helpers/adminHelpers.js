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
                        response.admin = admin
                        response.status = true
                        resolve(response)
                    }
                    else{
                        reject({ status: false })
                    }
                })
            }
            else{
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
    },


    addProduct : (product) => {
        return new Promise((resolve , reject) => {
            db.get().collection(collection.FOOD_COLLECTION).insertOne(product).then((response) => {
                resolve(response)
            })
        })
    },


    getAllProduct: () => {
        return new Promise((resolve, reject) => {
          db.get()
            .collection(collection.FOOD_COLLECTION)
            .find()
            .toArray()
            .then((products) => {
              resolve(products);
            })
            .catch((error) => {
              reject(error);
            });
        });
    },


    productDetails : (prodId) => {
    }
      

    
}