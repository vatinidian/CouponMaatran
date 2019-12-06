const router = require("express").Router();
let currencyModel = require("../model/currency.model");

router.route("/").get((req, res, next) => {
    currencyModel
    .find()
    .then(currencies => res.json(currencies))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const currency = req.body.currency;
  const currencyDesc = req.body.currencyDesc;

  const newCurrency = new currencyModel({
    currency,
    currencyDesc
  });

  newCurrency
    .save()
    .then(() => res.json("New Currency Type Added"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
