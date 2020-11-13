const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment")

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: {type: String, required: true},
  firstname: { type: String, required: true},
  lastname: {type: String,required: true },
  added: {type: Date, default: Date.now},
});

UserSchema.virtual("timestamp").get(function () {
  return moment(this.added).format("LLLL");
});

UserSchema.virtual("fullname").get(function () {
  return this.firstname + " " + this.lastname;
});

module.exports = mongoose.model("user", UserSchema);