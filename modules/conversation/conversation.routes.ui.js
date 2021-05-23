const router = require("express").Router();
const userController = require("../user/user.controller");
const connectionController = require("../connection/connection.controller");

router.get("/:id/:connectionid", async (req, res, next) => {
  let user = await userController.getUser(req.params.connectionid);
  let connection = await connectionController.getConnection(
    req.params.id,
    req.params.connectionid
  );

  res.render("conversation", {
    id: req.params.id,
    receiverid: req.params.connectionid,
    receivername: user.full_name,
    connectionid: connection,
  });
});

module.exports = router;
