const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const userLoginSchema = new Schema(
  {
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Number }
  },
  {
    timestamps: true
  }
);

userLoginSchema.virtual('userInfo', {
  ref: 'userInfo',
  localField: 'username',
  foreignField: 'username'
});


userLoginSchema.pre("save", function(next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // set the hashed password back on our user document
      user.password = hash;
      next();
    });
  });
});

userLoginSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userLoginSchema.set('toJSON', { virtuals: true });
userLoginSchema.set('toObject', { virtuals: true });
const user = mongoose.model("user", userLoginSchema);
module.exports = user;
