const router = require("express").Router();
const adminController = require("../admin/admin.controller");
const secureAPI = require("../../utils/secureAPI");

//get all users list
router.get("/get-users", async (req, res) => {
  try {
    const start = parseInt(req.query.start) || 0;
    const limit = parseInt(req.query.limit) || 25;
    let data = await adminController.getUsers(start, limit);
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
    let data = await adminController.getUserById(id);
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
    let data = await adminController.blockUserById(id);
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
    let data = await adminController.unBlockUserById(id);
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
    let data = await adminController.getAllBlockedUsers(start, limit);
    if (data) {
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/reports", async (req, res) => {});

router.get("/reports/:id", async (req, res) => {});

module.exports = router;
