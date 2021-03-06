const router = require("express").Router();
const config = require("config");
const userController = require("../user/user.controller");
const SecureAPI = require("../../utils/secureAPI");
const CheckApiKey = require("../../utils/checkApiKey");

const connectionController = require("./connection.controller");

router.get("/:id", async (req, res, next) => {
  let data = await userController.listConnections(req.params.id);
  res.json(data);
});

router.get("/:id/added", async (req, res, next) => {
  let data = await connectionController.searchFriend(req.params.id);
  res.json(data);
});

//list friend request
router.get(
  "/:id/incomingrequests",
  SecureAPI(),
  CheckApiKey(),
  async (req, res, next) => {
    let receiver = req.params.id;
    try {
      let data = await connectionController.listIncomingRequests(receiver);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
);

//list sent friend request
router.get(
  "/:id/sentrequests",
  SecureAPI(),
  CheckApiKey(),
  async (req, res, next) => {
    let sender = req.params.id;
    try {
      let data = await connectionController.listSentRequests(sender);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
);

//list all friends
router.get(
  "/:id/friends",
  SecureAPI(),
  CheckApiKey(),
  async (req, res, next) => {
    let id = req.params.id;
    try {
      let data = await connectionController.listFriends(id);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
);

router.post("/add/:id", SecureAPI(), CheckApiKey(), async (req, res, next) => {
  let data = await connectionController.addFriend(
    req.params.id,
    req.body.connectionId
  );
  res.json(data);
});

router.get("/blocklist/:id", SecureAPI(), CheckApiKey(), async (req, res) => {
  let data = await connectionController.blockedList(req.params.id);
  res.json(data);
});

router.post(
  "/block/:id",
  SecureAPI(),
  CheckApiKey(),
  async (req, res, next) => {
    let data = await connectionController.blockFriend(
      req.params.id,
      req.body.blockeduser
    );
    res.json(data);
  }
);

router.post(
  "/unblock/:id",
  SecureAPI(),
  CheckApiKey(),
  async (req, res, next) => {
    let data = await connectionController.unblockFriend(
      req.params.id,
      req.body.blockeduser
    );
    res.json(data);
  }
);

router.post(
  "/report/:id",
  SecureAPI(),
  CheckApiKey(),
  async (req, res, next) => {
    let { category, message, reporteduser } = req.body;
    let data = await connectionController.reportUser(
      req.params.id,
      reporteduser,
      category,
      message
    );
    res.json(data);
  }
);

//accept friend request
router.patch(
  "/accept/:id",
  SecureAPI(),
  CheckApiKey(),
  async (req, res, next) => {
    let data = await connectionController.acceptRequest(
      req.params.id,
      req.body.connectionId
    );
    res.json(data);
  }
);

router.delete("/cancel/:id", SecureAPI(), async (req, res, next) => {
  let data = await connectionController.cancelRequest(
    req.params.id,
    req.body.connectionid
  );
  res.json(data);
});

module.exports = router;
