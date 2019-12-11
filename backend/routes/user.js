const router = require("express").Router();
let userLoginModel = require("../model/userLogin.model");
let userInfoModel = require("../model/userInfo.model");

const loginStatusEnum = {
  INCOMPLETE_REQ: "INCOMPLETE_REQ",
  FAILED: "FAILED",
  LOGGED_IN: "LOGGED_IN",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  USER_EXIST: "USER_EXIST",
  NEW_USER: "NEW_SUER"
};

function addUserInfo(req) {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const emailID = req.body.emailID;
  const privacy = re.body.privacy;

  const newUserInfo = new userInfoModel({
    username,
    firstname,
    lastname,
    emailID,
    privacy
  });

  newUserInfo
    .save()
    .then(() => res.json("New User Info Added"))
    .catch(err => res.status(400).json("Error: " + err));
}
router.route("/getLoginStatusEnum").get((req, res) => {
  res.json(loginStatusEnum);
});

router.route("/login").get((req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.json({
      status: loginStatusEnum.INCOMPLETE_REQ
    });
  }
  userLoginModel
    .findOne({
      username: req.body.username
    }) /*.populate("userInfo")*/
    .exec(function(oError, user) {
      if (oError) {
        next(oError);
      }
      if (!user) {
        res.json({ status: loginStatusEnum.FAILED });
        return;
      }
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (err) next(err);
        console.log("Password is ", isMatch);

        if (isMatch) {
          user.populate("userInfo", function(err, out) {
            if (err) next(err);
            res.json({
              userInfo: out.userInfo[0],
              status: loginStatusEnum.LOGGED_IN
            });
          });
        } else {
          res.json({ status: loginStatusEnum.FAILED });
        }
      });
    });
});

router.route("/checkUserName/:username").get((req, res, next) => {
  userLoginModel.findOne(
    {
      username: req.params.username
    },
    function(oError, user) {
      if (oError) {
        next(oError);
      }
      if (!user) {
        res.json({ status: loginStatusEnum.USER_NOT_FOUND });
        console.log("No User Found");
      } else {
        res.json({ status: loginStatusEnum.USER_EXIST });
        console.log("User Exist");
      }
    }
  );
});

router.route("/register").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new userLoginModel({
    username,
    password
  });

  newUser
    .save()
    .then(() => {
      addUserInfo(req);
      res.json({
        statue: loginStatusEnum.NEW_USER
      });
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
