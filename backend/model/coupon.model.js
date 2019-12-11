const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const couponSchema = new Schema(
  {
    couponType: { required: true, type: String, trim: true },
    category: { required: true, type: String, trim: true },
    exchangePrice: { required: true, type: Number, trim: true, default: 0 },
    title: { required: true, type: String, trim: true },
    validityStart: { required: true, type: Date },
    validityEnd: { required: true, type: Date },
    description: { type: String },
    ownerID: { required: true, type: String },
    sourceProductID: { type: String, trim: true },
    negotiable: { required: true, type: Boolean, default: false },
    exchangeType: { required: true, type: String },
    quantity: { required: true, type: Number, default: 1 },
    currency: { required: true, type: String },
    couponPrice: { required: true, type: Number, default: 0 },
    exchangeInfo: { type: String} // Link to Other Model
  },
  {
    timestamps: true
  }
);

couponSchema.index(
  {
    title: "text",
    category: "text",
    description: "text"
  },
  {
    weights: {
      title: 5,
      description: 1
    }
  }
);

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
