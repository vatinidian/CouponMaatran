const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const currencySchema = new Schema(
  {
    currency: { required: true, type: String, trim: true, unique: true },
    currencyDesc: { type: String }
  },
  {
    timestamps: true
  }
);


const currency = mongoose.model("currency", currencySchema);
module.exports = currency;
