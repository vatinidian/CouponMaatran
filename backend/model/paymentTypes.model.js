const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentTypeSchema = new Schema(
  {
    paymentType: { required: true, type: String, trim: true, unique: true },
    paymentTypeDesc: { type: String }
  },
  {
    timestamps: true
  }
);


const paymentType = mongoose.model("paymentTypes", paymentTypeSchema);
module.exports = paymentType;
