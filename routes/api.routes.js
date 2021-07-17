const router = require("express").Router();
const userRouter = require("../modules/user/user.routes.api");
const connectionRouter = require("../modules/connection/connection.routes.api");
const avatarRouter = require("../modules/avatars/avatars.routes.api");
const locationRouter = require("../modules/location/location.routes.api");
const adminRouter = require("../modules/admin/admin.routes.api");
const conversationRouter = require("../modules/conversation/conversation.routes.api");

router.use("/user", userRouter);
router.use("/connection", connectionRouter);
router.use("/avatar", avatarRouter);
router.use("/location", locationRouter);
router.use("/admin", adminRouter);
router.use("/conversations", conversationRouter);

module.exports = router;
