const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userInfoModel = new Schema(
  {
    username: { type: String, ref: "user" },
    firstname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    emailID: { type: String, required: true, unique: true },
    privacy: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const userInfo = mongoose.model("userInfo", userInfoModel);
module.exports = userInfo;
