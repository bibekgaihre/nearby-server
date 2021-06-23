// const { compareSync } = require("bcryptjs");
const connectionModel = require("./connection.model");

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
  return data;
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

module.exports = {
  addFriend,
  searchFriend,
  acceptRequest,
  cancelRequest,
  getConnection,
};
