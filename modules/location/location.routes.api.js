const router = require("express").Router();
const config = require("config");
const secureAPI = require("../../utils/secureAPI");
const locationController = require("./location.controller");

router.get("/:id", secureAPI(), async (req, res) => {
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

router.post("/nearbyUsers", secureAPI(), async (req, res) => {
  try {
    let payload = req.body;
    let data = await locationController.getNearbyUsers(payload);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/updatelocation", secureAPI(), async (req, res) => {
  //logic behind updating the location
});

module.exports = router;
