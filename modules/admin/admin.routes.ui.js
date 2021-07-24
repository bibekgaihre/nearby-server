const router = require("express").Router();
// const SecureUI=require("../../utils/");;

router.get("/", (req, res) => {
  res.render("users");
});

module.exports = router;
