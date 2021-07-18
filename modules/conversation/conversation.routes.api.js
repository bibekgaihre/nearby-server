const router = require("express").Router();
const config = require("config");
const SecureAPI = require("../../utils/secureAPI");
const CheckApiKey = require("../../utils/checkApiKey");

const conversationController = require("./conversation.controller");

router.post(
  "/getallconversations",
  SecureAPI(),
  CheckApiKey(),
  async (req, res, next) => {
    let payload = req.body;
    let data = await conversationController.getAllMessage(payload);
    res.json(data);
  }
);

module.exports = router;
