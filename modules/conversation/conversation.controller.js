const conversationModel = require("./conversation.model");

const getMessage = async (payload) => {
  let message = await conversationModel
    .find({
      connection: payload.connectionid,
    })
    .limit(100)
    .sort({ created_at: -1 });

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

module.exports = { getMessage, createMessage };
