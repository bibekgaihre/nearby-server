const router = require("express").Router();
const config = require("config");
const avatarController = require("../avatars/avatars.controller");
const axios = require("axios");

router.get("/", async (req, res, next) => {
  try {
    const resp = await axios.get(
      "https://akabab.github.io/superhero-api/api/all.json"
    );
    res.json(resp.data);
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
});

module.exports = router;
