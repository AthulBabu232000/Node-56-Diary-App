var db = require("../config/connection");
var collection = require("../config/collections");
const bcrypt = require("bcrypt");
module.exports = {
  doSignup: async (userData) => {
let alreadyExists= await db.get().collection(collection.USER_COLLECTION).findOne({
  username:userData.username
})
console.log(alreadyExists);
if(alreadyExists === null){
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
}else{
  return '$2b$10$S/kte5Zu/jjqn73C3U8XfevCTBteNPtN8RzYGeubL1VQMQgN5J5x.';
}
  
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
