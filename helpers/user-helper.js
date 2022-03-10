var db = require("../config/connection");
var collection = require("../config/collections");
const bcrypt = require("bcrypt");
module.exports = {
  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
      userData.password = await bcrypt.hash(userData.password, 10);
      db.get()
        .collection(collection.USER_COLLECTION)
        .insertOne(userData)
        .then((data) => {
          console.log(data);
          resolve(data);
        });
    });
  },

  doLogin:(userData)=>{
    return new Promise(async(resolve,reject)=>{
      let loginStatus=false;
      let response={};
      await console.log(userData.username);
      // console.log(userData);
      // console.log("printed the username")
      let user=await db.get().collection(collection.USER_COLLECTION).findOne({username:userData.username})
      if(user){
        bcrypt.compare(userData.password,user.password).then((status)=>{
      
          if(status){
            console.log("login success");
            response.user=user;
            response.status=true;
            resolve(response);
          }else{
            console.log("login failed");
            resolve({status:false});
          }
        })

      }else{
        console.log("user login failed");
        resolve({status:false});

      }
    })
  }
};
