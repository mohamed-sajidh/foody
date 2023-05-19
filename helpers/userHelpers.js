const { response } = require('../app')
let collection = require('../config/collection')
const db = require('../config/connection')
const bcrypt = require('bcrypt');



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
                        console.log("login success");
                        response.user = user
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
                console.log("login failed...................");
                reject({ status: false })
            }
        })
    }


}