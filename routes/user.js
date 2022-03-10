var express = require("express");
var router = express.Router();
var userHelper = require("../helpers/user-helper");
var diaryHelper = require("../helpers/diary-helper");

/* GET home page. */
router.get("/", function (req, res, next) {
  let user = req.session.user;
  console.log(user, "printing user from user js");
  res.render("user/user-write", { title: "Express", admin: false, user: user });
});
router.get("/login", (req, res) => {
  res.render("user/login");
});
router.get("/signup", (req, res) => {
  res.render("user/signup");
});
router.post("/signup", (req, res) => {
  userHelper.doSignup(req.body).then((response) => {
    // console.log(response);
    res.redirect('/signup')
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

  router.get("/read", function (req, res, next) {

    let user = req.session.user;
   
    if (user) {
      diaryHelper.getAllDiary(user).then((diaryContent) => {
  
   
     console.log(diaryContent);
        res.render("user/user-read", { diaryContent:diaryContent });
      });
    } else {
      res.redirect("/noAccount");
    }
  
    });


module.exports = router;
