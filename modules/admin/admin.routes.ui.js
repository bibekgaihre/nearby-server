const router = require("express").Router();
// const SecureUI=require("../../utils/");;

router.get("/", (req, res) => {
  res.render("users");
});

router.get("/reportedlist", (req, res) => {
  res.render("reports");
});

router.get("/terminatedlist", (req, res) => {
  res.render("blockedlist");
});

router.get("/logout", (req, res, next) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;
