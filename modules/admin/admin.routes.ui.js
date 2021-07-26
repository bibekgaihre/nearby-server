const router = require("express").Router();
const SecureUI = require("../../utils/secureUI");

router.get("/", (req, res) => {
  res.render("index", { title: "Login" });
});
router.get("/users", SecureUI(), (req, res) => {
  res.render("users");
});

router.get("/reportedlist", SecureUI(), (req, res) => {
  res.render("reports");
});

router.get("/terminatedlist", SecureUI(), (req, res) => {
  res.render("blockedlist");
});

router.get("/logout", (req, res, next) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
