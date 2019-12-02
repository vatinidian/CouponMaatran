const router = require("express").Router();
let categoriesModel = require("../model/categories.model");

router.route("/").get((req, res, next) => {
  categoriesModel
    .find()
    .then(categories => res.json(categories))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const category = req.body.category;
  const categoryDesc = req.body.categoryDesc;

  const newcategory = new categoriesModel({
    category,
    categoryDesc
  });

  newcategory
    .save()
    .then(() => res.json("New Category Added"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
