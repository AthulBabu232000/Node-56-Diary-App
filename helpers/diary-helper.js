var db = require("../config/connection");
var collection = require("../config/collections");
module.exports = {
  enterDiary: (diaryData) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collection.DIARY_COLLECTION)
        .insertOne(diaryData)
        .then((data) => {
          console.log("data about to enter");

          console.log(data);
          console.log("data entered");
          resolve(data);
        });
    });
  },
  getAllDiary:(filterUser)=>{

    return new Promise(async(resolve, reject)=>{
        console.log(filterUser);
        let diaryContent=await db.get().collection(collection.DIARY_COLLECTION).find({username:filterUser.username}).toArray();
        resolve(diaryContent);
    });
}

  
};
