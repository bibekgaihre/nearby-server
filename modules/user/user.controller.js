const UserModel = require("./user.model");
const bcrypt = require("bcryptjs");

const saveUser = async (payload, path) => {
  payload = {
    email: payload.email,
    username: payload.username,
    password: payload.password,
    image: payload.imagePath,
  };
  let email = await UserModel.findOne({ email: payload.email }).exec();
  if (email) {
    return Promise.resolve({ message: "User Already Exists" });
  } else {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(payload.password, salt);
    payload.password = hash;
    let data = await UserModel.create(payload);
    return data;
  }
};

const checkAuth = async (payload) => {
  let user = await UserModel.findOne({ email: payload.email }).exec();
  if (!user) {
    console.log("incorrect");
    return Promise.resolve({
      message: "Email or Password is incorrect. Please try again",
    });
  }
  let chkPass = await bcrypt.compare(payload.password, user.password);
  if (chkPass) {
    return user;
  }
  return Promise.resolve({
    message: "Email or Password is incorrect. Please try again",
  });
};

const getUser = async (payload) => {
  let user = await UserModel.findOne({ _id: payload }, { password: 0 });
  return user;
};

const updateUser = async (payload, path, id) => {
  payload = {
    username: payload.username,
    phone: payload.phone,
    image: path,
  };
  console.log(payload);
  let data = await UserModel.findOneAndUpdate({ _id: id }, { $set: payload });
  return data;
};

const listConnections = async (payload) => {
  let connections = await UserModel.find(
    { _id: { $ne: payload } },
    { password: 0, phone: 0, email: 0 }
  );
  return connections;
};

module.exports = { saveUser, checkAuth, getUser, updateUser, listConnections };
