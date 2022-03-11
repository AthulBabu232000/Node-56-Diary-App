var express = require("express");
var router = express.Router();
var userHelper = require("../helpers/user-helper");
var diaryHelper = require("../helpers/diary-helper");
var md= require('markdown-it')({
  html:false,
});


/* GET home page. */
router.get("/write", function (req, res, next) {
  
  let user = req.session.user;
  if(user){

  
    res.render("user/user-write", { title: "Express", admin: false, user: user});
 
  }else{
    res.redirect('/noAccount');
  }
});
router.get("/login", (req, res) => {
  res.render("user/login");
});
router.get("/signup", (req, res) => {
  res.render("user/signup");
});
router.get('/alreadyuser',(req,res)=>{
  res.render('user/alreadyuser');
});
router.post("/signup", (req, res) => {
  userHelper.doSignup(req.body).then((response) => {
    // console.log(response);
    if(response=='$2b$10$S/kte5Zu/jjqn73C3U8XfevCTBteNPtN8RzYGeubL1VQMQgN5J5x.'){
      res.redirect('/alreadyuser');
    }else{
    res.redirect('/login');
    }
  });
});
router.post("/login", (req, res) => {
  // console.log(req.body);
  userHelper.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
router.get("/noAccount", (req, res) => {
  res.render("user/not");
});
router.post("/user-write", (req, res) => {

  let user = req.session.user;
 
  if (user) {
    diaryHelper.enterDiary(req.body).then((response) => {
      res.redirect("/");
    });
  } else {
    res.redirect("/noAccount");
  }
});

  router.get("/", function (req, res, next) {

    let user = req.session.user;
   
    if (user) {

      diaryHelper.getAllDiary(user).then((diaryContent) => {
  
        // var result = md.render(diaryContent.markdown);
        console.log(diaryContent.markdown);
        console.log(diaryContent);
   
        res.render("user/user-read", { diaryContent:diaryContent,user:user});
      });
    } else {
      res.redirect("/noAccount");
    }
  
    });


module.exports = router;
