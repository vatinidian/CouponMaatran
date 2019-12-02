const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriesSchema = new Schema(
  {
    category: { required: true, type: String, trim: true, unique: true },
    categoryDesc: { type: String }
  },
  {
    timestamps: true
  }
);


const categories = mongoose.model("Categories", categoriesSchema);
module.exports = categories;
