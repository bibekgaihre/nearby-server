const router = require("express").Router();
const config = require("config");
const secureAPI = require("../../utils/secureAPI");
const locationController = require("./location.controller");
const CheckAPIKey = require("../../utils/checkApiKey");

router.get("/:id", secureAPI(), CheckAPIKey(), async (req, res) => {
  try {
    let data = await locationController.getLocation(req.params.id);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", secureAPI(), async (req, res) => {
  //post the user location Lon, Lat
});

router.get("/nearbyUsers/:id", secureAPI(), CheckAPIKey(), async (req, res) => {
  try {
    let id = req.params.id;
    let data = await locationController.getNearbyUsers(id);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/updatelocation", secureAPI(), async (req, res) => {
  //logic behind updating the location
});

module.exports = router;
