const conversationModel = require("./conversation.model");
const userModel = require("../user/user.model");

const getMessage = async (payload) => {
  let message = await conversationModel
    .find({
      connection: payload.connectionid,
    })
    .limit(100)
    .sort({ created_at: -1 })
    .populate("connectionid", "username image");
  return message;
};
const createMessage = async (payload) => {
  payload = {
    connection: payload.connectionid,
    value: payload.message,
    sender: payload.sender,
  };
  let data = await conversationModel.create(payload);

  return data;
};

const getAllMessage = async (payload) => {
  let sender = payload.sender;
  let receiver = payload.receiver;
  let data = await conversationModel
    .find({
      $or: [
        { sender: sender, connection: receiver },
        { sender: receiver, connection: sender },
      ],
    })
    .populate("connection", "username image")
    .populate("sender", "username image");

  return data;
};

const getProperMessageFormat = async (payload) => {
  let sender = await userModel.findOne({ _id: payload.sender });
  let connection = await userModel.findOne({ _id: payload.connection });
  let data = {
    connection: {
      username: connection.username,
      image: connection.image,
    },
    value: payload.value,
    sender: {
      username: sender.username,
      image: sender.image,
    },
    created_at: payload.created_at,
    updated_at: payload.updated_at,
  };
  return data;
};

module.exports = {
  getMessage,
  createMessage,
  getAllMessage,
  getProperMessageFormat,
};
