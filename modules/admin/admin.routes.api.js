const router = require("express").Router();
const Controller = require("./admin.controller");
const secureAPI = require("../../utils/secureAPI");
const config = require("config");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res, next) => {
  try {
    let data = await Controller.onCreate(req.body);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res, next) => {
  let payload = req.body;
  try {
    let data = await Controller.onLogin(payload);
    if (data.email) {
      console.log("email found");
      const token = await jwt.sign(
        {
          email: data.email,
          userId: data._id,
        },
        config.get("app.secret"),
        {
          expiresIn: "48h",
        }
      );
      res.cookie("token", token).status(200).json({
        message: "Login Successfull",
        token: token,
        id: data.id,
      });
    } else if (!data.email) {
      res.status(401).json(data);
    }
  } catch (error) {
    res.json(error);
  }
});

//get all users list
router.get("/get-users", secureAPI(), async (req, res) => {
  try {
    const start = parseInt(req.query.start) || 0;
    const limit = parseInt(req.query.limit) || 25;
    let data = await Controller.getUsers(start, limit);
    if (data) {
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-users/:id", secureAPI(), async (req, res) => {
  try {
    let id = req.params.id;
    let data = await Controller.getUserById(id);
    if (data) {
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
  }
});

router.patch("/block-user/:id", secureAPI(), async (req, res) => {
  try {
    let id = req.params.id;
    let data = await Controller.blockUserById(id);
    if (data) {
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
  }
});

router.patch("/unblock-user/:id", secureAPI(), async (req, res) => {
  try {
    let id = req.params.id;
    let data = await Controller.unBlockUserById(id);
    if (data) {
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/blocked-list", secureAPI(), async (req, res) => {
  try {
    const start = parseInt(req.query.start) || 0;
    const limit = parseInt(req.query.limit) || 25;
    let data = await Controller.getAllBlockedUsers(start, limit);
    if (data) {
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/reports", secureAPI(), async (req, res) => {
  try {
    const start = parseInt(req.query.start) || 0;
    const limit = parseInt(req.query.limit) || 25;
    let data = await Controller.getAllReports(start, limit);
    if (data) {
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/reports/:id", secureAPI(), async (req, res) => {
  try {
    let data = await Controller.getReport(req.params.id);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
