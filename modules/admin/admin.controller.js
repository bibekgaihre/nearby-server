const userModel = require("../user/user.model");
const reportModel = require("../connection/report.model");
const authModel = require("./auths.model");
const bcrypt = require("bcryptjs");

const onCreate = async (payload) => {
  payload = {
    email: payload.email,
    password: payload.password,
  };
  let email = await authModel.findOne({ email: payload.email }).exec();
  if (email) {
    return Promise.resolve({ message: "Admin Already Exists" });
  } else {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(payload.password, salt);
    payload.password = hash;
    let data = await authModel.create(payload);
    return data;
  }
};

const onLogin = async (payload) => {
  let admin = await authModel.findOne({ email: payload.email }).exec();
  if (!admin) {
    return Promise.resolve({
      message: "Email or Password is incorrect. Please try again",
    });
  }
  let chkPass = await bcrypt.compare(payload.password, admin.password);
  if (chkPass) {
    return admin;
  }
  return Promise.resolve({
    message: "Email or Password is incorrect. Please try again",
  });
};

const getUsers = async (start, limit) => {
  let page = parseInt(start) / parseInt(limit) + 1;
  try {
    let total = await userModel.countDocuments();
    let data = await userModel
      .find({})
      .skip(start)
      .limit(limit)
      .sort({ created_at: -1 });
    let results = {
      total,
      start,
      limit,
      page,
      data,
    };
    return results;
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (id) => {};

const blockUserById = async (id) => {
  let data = await userModel.findOneAndUpdate(
    { _id: id },
    { isActive: false },
    { new: true }
  );
  return data;
};

const getAllBlockedUsers = async (start, limit) => {
  let page = parseInt(start) / parseInt(limit) + 1;
  try {
    let total = await userModel.countDocuments({ isActive: false });
    let data = await userModel
      .find({ isActive: false })
      .skip(start)
      .limit(limit)
      .sort({ created_at: -1 });
    let results = {
      total,
      start,
      limit,
      page,
      data,
    };
    return results;
  } catch (error) {
    console.log(error);
  }
};

const unBlockUserById = async (id) => {
  let data = await userModel.findOneAndUpdate(
    { _id: id },
    { isActive: true },
    { new: true }
  );
  return data;
};

const getAllReports = async (start, limit) => {
  let page = parseInt(start) / parseInt(limit) + 1;
  try {
    let total = await reportModel.countDocuments();
    let data = await reportModel
      .find({})
      .populate("reportedBy", "username")
      .populate("reportedUser", "username")
      .skip(start)
      .limit(limit)
      .sort({ created_at: -1 });
    let results = {
      total,
      start,
      limit,
      page,
      data,
    };
    return results;
  } catch (error) {
    console.log(error);
  }
};

const getReport = async (id) => {
  try {
    let data = await reportModel
      .findOne({ _id: id })
      .populate("reportedBy", "username")
      .populate("reportedUser", "username");
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  getAllBlockedUsers,
  blockUserById,
  unBlockUserById,
  getAllReports,
  getReport,
  onCreate,
  onLogin,
};
