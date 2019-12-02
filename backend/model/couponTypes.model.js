const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const couponTypeSchema = new Schema(
  {
    couponType: { required: true, type: String, trim: true, unique: true },
    couponTypeDesc: { type: String }
  },
  {
    timestamps: true
  }
);


const couponType = mongoose.model("couponTypes", couponTypeSchema);
module.exports = couponType;
