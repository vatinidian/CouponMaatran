const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exchangeTypeSchema = new Schema(
  {
    exchangeType: { required: true, type: String, trim: true, unique: true },
    exchangeTypeDesc: { type: String }
  },
  {
    timestamps: true
  }
);


const exchangeType = mongoose.model("exchangeTypes", exchangeTypeSchema);
module.exports = exchangeType;
