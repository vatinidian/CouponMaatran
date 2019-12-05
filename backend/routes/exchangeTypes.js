const router = require("express").Router();
let exchangeTypeModel = require("../model/exchangeTypes.model");

router.route("/").get((req, res, next) => {
    exchangeTypeModel
    .find()
    .then(exchangeTypes => res.json(exchangeTypes))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const exchangeType = req.body.exchangeType;
  const exchangeTypeDesc = req.body.exchangeTypeDesc;

  const newexchangeType = new exchangeTypeModel({
    exchangeType,
    exchangeTypeDesc
  });

  newexchangeType
    .save()
    .then(() => res.json("New exchange Type Added"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
