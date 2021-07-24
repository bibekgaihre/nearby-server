const router = require("express").Router();
const adminRouter = require("../modules/admin/admin.routes.ui");

router.use("/", adminRouter);

module.exports = router;
