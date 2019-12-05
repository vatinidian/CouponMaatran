const router = require("express").Router();
const q = require("q");
let categoriesModel = require("../model/categories.model");
let couponTypeModel = require("../model/couponTypes.model");
let exchangeTypeModel = require("../model/exchangeTypes.model");

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
    exchangeTypeModel.find().exec()
  ];

  let aCategories = [],
    aCouponTypes = [],
    aexchangeTypes = [];

  q.all(filterListPromises).then(function(aResults) {
    aCategories = parseResult(aResults[0], "category", "categoryDesc", "category");
    aCouponTypes = parseResult(aResults[1], "couponType", "couponTypeDesc", "couponType");
    aexchangeTypes = parseResult(aResults[2], "exchangeType", "exchangeTypeDesc", "exchangeType");
    res.json([...aCategories, ...aCouponTypes, ...aexchangeTypes]);
  });
});

module.exports = router;
