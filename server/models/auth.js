const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: [true, "Username already taken"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email address"],
      unique: [true, "Email address already taken"],
    },
    phoneNumber: { type: String },
    profilePic: { type: String },
  },
  { timestamps: true }
);
UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", UserSchema);
