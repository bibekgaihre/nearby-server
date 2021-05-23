const router = require("express").Router();
const apiRouter = require("./api.routes");

// router.use("/", uiRouter);
router.use("/api", apiRouter);

module.exports = router;
