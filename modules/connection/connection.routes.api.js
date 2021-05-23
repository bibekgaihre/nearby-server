const router = require("express").Router();
const config = require("config");
const userController = require("../user/user.controller");
const SecureAPI = require("../../utils/secureAPI");

const connectionController = require("../connection/connection.controller");

router.get("/:id", async (req, res, next) => {
  let data = await userController.listConnections(req.params.id);
  res.json(data);
});

router.get("/:id/added", async (req, res, next) => {
  let data = await connectionController.searchFriend(req.params.id);
  res.json(data);
});

router.post("/add/:id", SecureAPI(), async (req, res, next) => {
  let data = await connectionController.addFriend(
    req.params.id,
    req.body.connectionid
  );
  res.json(data);
});

router.patch("/accept/:id", SecureAPI(), async (req, res, next) => {
  let data = await connectionController.acceptRequest(
    req.params.id,
    req.body.connectionid
  );
  res.json(data);
});

router.delete("/cancel/:id", SecureAPI(), async (req, res, next) => {
  let data = await connectionController.cancelRequest(
    req.params.id,
    req.body.connectionid
  );
  res.json(data);
});

module.exports = router;
