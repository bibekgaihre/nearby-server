const userModel = require("../user/user.model");

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

const getAllReports = async (start, limit) => {};

const getReport = async (id) => {};

module.exports = {
  getUsers,
  getUserById,
  getAllBlockedUsers,
  blockUserById,
  unBlockUserById,
};
