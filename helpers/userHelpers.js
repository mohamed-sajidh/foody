const { promises } = require('fs');
const { response } = require('../app')
let collection = require('../config/collection')
const db = require('../config/connection')
const bcrypt = require('bcrypt');
const { resolve } = require('path');



module.exports = {


    dosignUp : (userData) => {
        userData.isAdmin = false
        return new Promise(async (resolve , reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((response) => {
                resolve(response)
            })
        })
    },


    doLogin : (loginData) => {
        
        return new Promise(async (resolve , reject) => {
            let response = {}

            let user = await db.get().collection(collection.USER_COLLECTION).findOne({email : loginData.email})

            if(user){
                bcrypt.compare(loginData.password, user.password).then((status) => {
                    if(status) {
                        response.user = user
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


    getAllFood : () => {
        return new Promise((resolve , reject) => {
            db.get().collection(collection.FOOD_COLLECTION).find().toArray().then((food) => {
                resolve(food)
            })
        })
    },


    getfood: ((category) => {
        return new Promise(async (resolve, reject) => {
          try {
            let product = await db.get().collection(collection.FOOD_COLLECTION).find({ category: category }).toArray();
            resolve(product);
          } catch (error) {
            reject(error);
          }
        });
    })


    


}