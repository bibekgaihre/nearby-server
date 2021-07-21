const UserModel = require("../modules/user/user.model");
const mongoose = require("mongoose");

const checkApiKey = () => {
  return async function (req, res, next) {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(401).json({ message: "Id is not valid" });
      }
      let apiKey = req.query.apiKey;
      let data = await UserModel.findOne({
        _id: id,
        apiKey: apiKey,
      });
      if (!data) {
        return res
          .status(401)
          .json({ message: "API Key and userid does not match" });
      } else if (data) {
        next();
      }
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ message: "Something went wrong. Try again." });
    }
  };
};

module.exports = checkApiKey;
