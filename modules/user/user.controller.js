const UserModel = require("./user.model");
const bcrypt = require("bcryptjs");
const { saveLocation } = require("../location/location.controller");

const saveUser = async (payload, path) => {
  let location = { long: payload.lng, lat: payload.lat };

  payload = {
    email: payload.email,
    username: payload.username,
    password: payload.password,
    image: payload.image,
  };
  let email = await UserModel.findOne({ email: payload.email }).exec();
  let username = await UserModel.findOne({ username: payload.username }).exec();
  if (email || username) {
    return Promise.resolve({ message: "Username or Email Already Exists" });
  } else {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(payload.password, salt);
    payload.password = hash;
    let data = await UserModel.create(payload);
    data.location = location;
    let locData = await saveLocation(data);
    return {
      username: data.username,
      user: locData.user,
      email: payload.email,
    };
  }
};

const checkAuth = async (payload) => {
  let user = await UserModel.findOne({ email: payload.email }).exec();
  if (!user) {
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
