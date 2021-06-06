const router = require("express").Router();
const config = require("config");
const secureAPI = require("../../utils/secureAPI");
const locationController = require("./location.controller");

router.get("/", secureAPI(), async (req, res) => {
  // let data=await
});

router.post("/", secureAPI(), async (req, res) => {
  //post the user location Lon, Lat
});

router.get("/nearbyUsers", secureAPI(), async (req, res) => {
  //logic for nearby users.
});

router.post("/updatelocation", secureAPI(), async (req, res) => {
  //logic behind updating the location
});

module.exports = router;
