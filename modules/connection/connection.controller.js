// const { compareSync } = require("bcryptjs");
const mongoose = require("mongoose");
const connectionModel = require("./connection.model");
const userModel = require("../user/user.model");
const locationController = require("../location/location.controller");

const getConnection = async (sender, receiver) => {
  let data = await connectionModel.findOne({
    $or: [{ user: [receiver, sender] }, { user: [sender, receiver] }],
  });
  return data._id;
};

const addFriend = async (sender, receiver) => {
  //insert a document and make status to pending
  let payload = {
    user: [sender, receiver],
    status: "pending",
  };

  let data = await connectionModel.findOneAndUpdate(
    { user: [sender, receiver] },
    payload,
    { upsert: true, new: true }
  );
  if (data) {
    let result = await locationController.getNearbyUsers(sender);
    result = {
      status: "friend request sent",
      data: result,
    };
    return result;
  }
};

const listSentRequests = async (sender) => {
  let data = await connectionModel.aggregate([
    {
      $match: {
        "user.0": mongoose.Types.ObjectId(sender),
        status: "pending",
      },
    },
    {
      $project: {
        connection: { $arrayElemAt: ["$user", 1] },
      },
    },
    {
      $lookup: {
        from: "user",
        localField: "connection",
        foreignField: "_id",
        as: "users",
      },
    },
    {
      $unwind: "$users",
    },
    {
      $project: {
        _id: 0,
        username: "$users.username",
        userid: "$users._id",
        image: "$users.image",
      },
    },
  ]);
  return data;
};

const listIncomingRequests = async (receiver) => {
  let data = await connectionModel.aggregate([
    {
      $match: {
        "user.1": mongoose.Types.ObjectId(receiver),
        status: "pending",
      },
    },
    {
      $project: {
        connection: { $arrayElemAt: ["$user", 0] },
      },
    },
    {
      $lookup: {
        from: "user",
        localField: "connection",
        foreignField: "_id",
        as: "users",
      },
    },
    {
      $unwind: "$users",
    },
    {
      $project: {
        _id: 0,
        username: "$users.username",
        userid: "$users._id",
        image: "$users.image",
      },
    },
  ]);
  return data;
};

const listFriends = async (id) => {
  let data = await connectionModel.find(
    {
      user: { $in: id },
      status: "active",
    },
    { user: 1 }
  );
  let friends = [];
  for await (let element of data) {
    if (element.user[0] != id) {
      friends.push(element.user[0]);
    } else if (element.user[1] != id) {
      friends.push(element.user[1]);
    }
  }
  let connection = [];
  for await (let element of friends) {
    let user = await userModel.findOne(
      { _id: element },
      { username: 1, _id: 1, image: 1 }
    );
    console.log(user);
    connection.push(user);
  }
  return connection;
};

const searchFriend = async (id) => {
  let data = await connectionModel.find({ user: { $in: id } }).populate("user");

  let pendingrequest = [];
  let addedfriends = [];
  let followers = [];

  data.map((e) => {
    if (e.status.includes("pending") && e.user[0]._id == id) {
      pendingrequest.push(e);
    } else if (e.status.includes("pending") && e.user[1]._id == id) {
      followers.push(e);
    } else if (e.status.includes("active")) {
      addedfriends.push(e);
    }
  });

  return { pendingrequest, addedfriends, followers };
};

const cancelRequest = async (sender, receiver) => {
  //delete document from db
  let data = await connectionModel.findOneAndRemove({
    user: [sender, receiver],
  });

  return data;
};
const acceptRequest = async (receiver, sender) => {
  //update status to active
  let payload = { status: "active" };
  let data = await connectionModel.findOneAndUpdate(
    { user: [sender, receiver] },
    payload,
    { new: true }
  );
  return data;
};

const filterUser = (module.exports = {
  addFriend,
  searchFriend,
  acceptRequest,
  cancelRequest,
  getConnection,
  listSentRequests,
  listIncomingRequests,
  listFriends,
});
