const router = require("express").Router();
const q = require("q");
let categoriesModel = require("../model/categories.model");
let couponTypeModel = require("../model/couponTypes.model");
let paymentTypeModel = require("../model/paymentTypes.model");

function parseResult(aResults, sFilterName, sFilterDesc, sPropertyName) {
  let aOutput = [];
  aOutput = aResults.map(oResult => ({
    filterName: oResult._doc[sFilterName],
    propertyInCouponModel: sPropertyName,
    description: oResult._doc[sFilterDesc]
  }));

  return aOutput;
}
router.route("/").get((req, res, next) => {
  let filterListPromises = [
    categoriesModel.find().exec(),
    couponTypeModel.find().exec(),
    paymentTypeModel.find().exec()
  ];

  let aCategories = [],
    aCouponTypes = [],
    aPaymentTypes = [];

  q.all(filterListPromises).then(function(aResults) {
    debugger;
    aCategories = parseResult(aResults[0], "category", "categoryDesc", "category");
    aCouponTypes = parseResult(aResults[1], "couponType", "couponTypeDesc", "couponType");
    aPaymentTypes = parseResult(aResults[2], "paymentType", "paymentTypeDesc", "paymentType");
    res.json([...aCategories, ...aCouponTypes, ...aPaymentTypes]);
  });
});

module.exports = router;
