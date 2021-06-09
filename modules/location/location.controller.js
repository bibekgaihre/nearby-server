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

const getLocation = async (id) => {
  return locationModel.findOne({ user: id });
};

const getNearbyUsers = async (payload) => {
  let locationdata = await locationModel.findOne({ user: payload.user });
  let data = await locationModel
    .find({
      location: {
        $near: {
          $maxDistance: 3000,
          $geometry: {
            type: "Point",
            coordinates: locationdata.location.coordinates,
          },
        },
      },
    })
    .populate({
      path: "user",
      select: "username image",
    });

  return data;
};

module.exports = { saveLocation, getLocation, getNearbyUsers };
