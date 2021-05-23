const router = require("express").Router();
const Controller = require("./user.controller");
const SecureUI = require("../../utils/secureUI");

router.get("/update/:id", SecureUI(), async (req, res, next) => {
  res.render("update", { id: req.params.id });
});

router.get("/:id/friend", SecureUI(), async (req, res, next) => {
  res.render("friend", { id: req.params.id });
});

module.exports = router;
