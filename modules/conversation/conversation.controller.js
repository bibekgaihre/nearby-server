const conversationModel = require("./conversation.model");

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
    .sort({ created_at: -1 })
    .populate("connection", "username image")
    .populate("sender", "username image");
  console.log(data);

  return data;
};

module.exports = { getMessage, createMessage, getAllMessage };
