const router = require("express").Router();
let paymentTypeModel = require("../model/paymentTypes.model");

router.route("/").get((req, res, next) => {
    paymentTypeModel
    .find()
    .then(paymentTypes => res.json(paymentTypes))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const paymentType = req.body.paymentType;
  const paymentTypeDesc = req.body.paymentTypeDesc;

  const newpaymentType = new paymentTypeModel({
    paymentType,
    paymentTypeDesc
  });

  newpaymentType
    .save()
    .then(() => res.json("New Payment Type Added"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
