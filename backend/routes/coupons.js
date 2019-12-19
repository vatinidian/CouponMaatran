const router = require("express").Router();
let CouponModel = require("../model/coupon.model");

function caseInsensitiveQuery(optValues) {
  var optRegexp = [];
  optValues.forEach(function(opt) {
    optRegexp.push(new RegExp(opt, "i"));
  });

  return optRegexp;
}

router.route("/").get((req, res, next) => {
  let searchFilter = req.query.searchFilter || "";
  let regex = new RegExp(searchFilter, "i");
  let oSubFilters = {};

  if (req.query.subFilters) {
    oSubFilters = JSON.parse(req.query.subFilters);
  }

  /*let oQuery = searchFilter
    ? {
        $text: { $search: "\""+ searchFilter + "\"", $caseSensitive: false }
      }
    : {};
  */

  let oQuery = searchFilter
    ? {
        $or: [
          { title: regex },
          { description: regex },
          { category: regex },
          { couponType: regex }
        ]
      }
    : {};

  if (!req.query.expired || req.query.expired === "false") {
    oQuery["validityEnd"] = {
      $gte: new Date().setHours(0, 0, 0, 0)
    };
  }

  let aSubFilters;
  for (const sKey in oSubFilters) {
    aSubFilters = caseInsensitiveQuery(oSubFilters[sKey]);
    oQuery[sKey] = aSubFilters;
  }

  CouponModel.find(oQuery)
    .sort("validityEnd")
    .then(coupons => res.json(coupons))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const couponType = req.body.couponType;
  const category = req.body.category;
  const couponPrice = Number(req.body.couponPrice) || 0;
  const exchangePrice = Number(req.body.exchangePrice) || 0;
  const title = req.body.title;
  const validityStart = Date.parse(req.body.validityStart);
  const validityEnd = Date.parse(req.body.validityEnd);
  const description = req.body.description;
  const ownerID = req.body.ownerID;
  const sourceProductID = req.body.sourceProductID;
  const negotiable = req.body.negotiable || false;
  const exchangeType = req.body.exchangeType;
  const quantity = Number(req.body.quantity) || 0;
  const currency = req.body.currency;
  const exchangeInfo = req.body.exchangeInfo;

  const newCoupon = new CouponModel({
    couponType,
    category,
    couponPrice,
    exchangePrice,
    title,
    validityStart,
    validityEnd,
    description,
    ownerID,
    sourceProductID,
    negotiable,
    exchangeType,
    quantity,
    currency,
    exchangeInfo
  });

  newCoupon
    .save()
    .then(() => res.json("New Coupon Added"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
