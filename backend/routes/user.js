const router = require("express").Router();
let userLoginModel = require("../model/userLogin.model");
let userInfoModel = require("../model/userInfo.model");

const loginStatusEnum = {
  FORBIDDEN: { status: "FORBIDDEN", text: "Authorization issue" },
  INCOMPLETE_REQ: { status: "INCOMPLETE_REQ", text: "Incomplete Information" },
  FAILED: { status: "FAILED", text: "Username or Password incorrect" },
  LOGGED_IN: { status: "LOGGED_IN", text: "You are logged in" },
  USER_NOT_FOUND: { status: "USER_NOT_FOUND", text: "User not found" },
  USER_EXIST: { status: "USER_EXIST", text: "User already exist" },
  NEW_USER: { status: "NEW_USER", text: "New user" }
};

function addUserInfo(req, res, callback) {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const emailID = req.body.emailID;
  const privacy = req.body.privacy;

  const newUserInfo = new userInfoModel({
    username,
    firstname,
    lastname,
    emailID,
    privacy
  });

  newUserInfo
    .save()
    .then(callback)
    .catch(err => res.status(400).json("Error: " + err));
}
router.route("/getLoginStatusEnum").get((req, res) => {
  res.json(loginStatusEnum);
});

router.route("/login").get((req, res, next) => {
  let authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.json({
      status: loginStatusEnum.FORBIDDEN.status,
      statusText: loginStatusEnum.FORBIDDEN.text
    });

    return;
  }

  let aUserAuth = new Buffer(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");
  let sPassword = aUserAuth[1];
  userLoginModel
    .findOne({
      username: aUserAuth[0]
    }) /*.populate("userInfo")*/
    .exec(function(oError, user) {
      if (oError) {
        next(oError);
      }
      if (!user) {
        res.json({
          status: loginStatusEnum.FAILED.status,
          statusText: loginStatusEnum.FAILED.text
        });
        return;
      }
      user.comparePassword(sPassword, function(err, isMatch) {
        if (err) next(err);

        if (isMatch) {
          user.populate("userInfo", function(err, out) {
            if (err) next(err);
            res.json({
              userInfo: out.userInfo[0],
              status: loginStatusEnum.LOGGED_IN.status,
              statusText: loginStatusEnum.LOGGED_IN.text
            });
          });
        } else {
          res.json({
            status: loginStatusEnum.FAILED.status,
            statusText: loginStatusEnum.FAILED.text
          });
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
        res.json({
          status: loginStatusEnum.USER_NOT_FOUND.status,
          statusText: loginStatusEnum.USER_NOT_FOUND.text
        });
      } else {
        res.json({
          status: loginStatusEnum.USER_EXIST.status,
          statusText: loginStatusEnum.USER_EXIST.text
        });
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
      addUserInfo(req, res, userInfo => {
        // remove few fields
        let oUserDetails = userInfo;
        if (
          oUserDetails.createdAt &&
          oUserDetails.updatedAt &&
          oUserDetails._id
        ) {
          delete oUserDetails.createdAt;
          delete oUserDetails.updatedAt;
          delete oUserDetails._id;
        }
        
        res.json({
          userInfo: userInfo,
          status: loginStatusEnum.NEW_USER.status,
          statusText: loginStatusEnum.NEW_USER.text
        });
      });
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
