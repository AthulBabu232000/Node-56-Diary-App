var db = require("../config/connection");
var collection = require("../config/collections");
var md= require('markdown-it')({
  html:false,
});
module.exports = {
  enterDiary: (diaryData) => {
    return new Promise(async (resolve, reject) => {
      diaryData.markdown=md.render(diaryData.markdown);
      console.log(diaryData.markdown);
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
