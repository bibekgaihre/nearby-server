const router = require("express").Router();
const userRouter = require("../modules/user/user.routes.api");
const connectionRouter = require("../modules/connection/connection.routes.api");

router.use("/user", userRouter);
router.use("/connection", connectionRouter);

module.exports = router;
