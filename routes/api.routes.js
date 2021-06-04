const router = require("express").Router();
const userRouter = require("../modules/user/user.routes.api");
const connectionRouter = require("../modules/connection/connection.routes.api");
const avatarRouter = require("../modules/avatars/avatars.routes.api");

router.use("/user", userRouter);
router.use("/connection", connectionRouter);
router.use("/avatar", avatarRouter);

module.exports = router;
