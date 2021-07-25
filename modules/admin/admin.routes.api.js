const router = require("express").Router();
const Controller = require("./admin.controller");
const secureAPI = require("../../utils/secureAPI");

//get all users list
router.get("/get-users", async (req, res) => {
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

router.get("/get-users/:id", async (req, res) => {
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

router.patch("/block-user/:id", async (req, res) => {
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

router.patch("/unblock-user/:id", async (req, res) => {
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

router.get("/blocked-list", async (req, res) => {
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

router.get("/reports", async (req, res) => {
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

router.get("/reports/:id", async (req, res) => {
  try {
    let data = await Controller.getReport(req.params.id);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
