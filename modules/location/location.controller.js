const locationModel = require("./location.model");

const saveLocation = async (payload) => {
  payload = {
    user: payload._id,
    location: {
      type: "Point",
      coordinates: [payload.location.long, payload.location.lat],
    },
  };
  return locationModel.create(payload);
};

const getLocation = async (payload) => {};

module.exports = { saveLocation };
