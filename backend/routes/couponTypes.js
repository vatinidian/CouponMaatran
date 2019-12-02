const router = require("express").Router();
let couponTypeModel = require("../model/couponTypes.model");

router.route("/").get((req, res, next) => {
    couponTypeModel
    .find()
    .then(couponTypes => res.json(couponTypes))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const couponType = req.body.couponType;
  const couponTypeDesc = req.body.couponTypeDesc;

  const newcouponType = new couponTypeModel({
    couponType,
    couponTypeDesc
  });

  newcouponType
    .save()
    .then(() => res.json("New Coupon Type Added"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
