const router = require("express").Router();
let CouponModel = require("../model/coupon.model");

router.route("/").get((req, res, next) => {
  let searchFilter = req.query.searchFilter || "";
  let regex = new RegExp(searchFilter, "i");

  /*let oQuery = searchFilter
    ? {
        $text: { $search: "\""+ searchFilter + "\"", $caseSensitive: false }
      }
    : {};
  */

  let oQuery = searchFilter
    ? {
        $or: [{ title: regex }, { description: regex }, {category: regex}, {couponType: regex}]
      }
    : {};

  CouponModel.find(oQuery)
    .then(coupons => res.json(coupons))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const couponType = req.body.couponType;
  const category = req.body.category;
  const price = Number(req.body.price);
  const title = req.body.title;
  const validityStart = Date.parse(req.body.validityStart);
  const validityEnd = Date.parse(req.body.validityEnd);
  const description = req.body.description;
  const ownerID = req.body.ownerID;
  const sourceProductID = req.body.sourceProductID;
  const exchangeOnly = req.body.exchangeOnly;
  const negotiable = req.body.negotiable;
  const paymentType = req.body.paymentType;
  const quantity = req.body.quantity;

  const newCoupon = new CouponModel({
    couponType,
    category,
    price,
    title,
    validityStart,
    validityEnd,
    description,
    ownerID,
    sourceProductID,
    exchangeOnly,
    negotiable,
    paymentType,
    quantity
  });

  newCoupon
    .save()
    .then(() => res.json("New Coupon Added"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
