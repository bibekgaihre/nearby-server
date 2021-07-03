const locationModel = require("./location.model");
const connectionModel = require("../connection/connection.model");
const mongoose = require("mongoose");

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

const getNearbyUsers = async (id) => {
  let locationdata = await locationModel.findOne({
    user: mongoose.Types.ObjectId(id),
  });
  let data = await locationModel
    .find({
      location: {
        $near: {
          $maxDistance: 20000,
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
  let self = locationdata.location.coordinates;
  let result = await processUser(data, id);
  result = result.map((element) => {
    let distance = calculateDistance(
      self[1],
      self[0],
      element.location.coordinates[1],
      element.location.coordinates[0]
    );
    distance = distance.toFixed(1);

    return {
      username: element.user.username,
      id: element.user.id,
      distance: distance,
      image: element.user.image || null,
    };
  });

  let response = await checkConnection(result, id);
  return response;
};

const checkConnection = async (result, id) => {
  let filteredlist = [];

  for await (let element of result) {
    let connection = await connectionModel.findOne({
      $and: [
        {
          user: {
            $in: [mongoose.Types.ObjectId(element.id)],
          },
        },
        {
          user: {
            $in: [mongoose.Types.ObjectId(id)],
          },
        },
      ],
      status: "active",
    });
    if (!connection) {
      filteredlist.push(element);
    }
  }
  return filteredlist;
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist;
  }
};

const processUser = async (data, id) => {
  let processedData = [];

  data.forEach((element) => {
    if (element.user) {
      if (element.user._id != id) {
        processedData.push(element);
      }
    }
  });
  return processedData;
};

module.exports = { saveLocation, getLocation, getNearbyUsers };
