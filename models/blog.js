const mongoose = require("mongoose");
const Schema = mogoose.Schema;
const moment = require("moment");


const BlogSchema = new Schema({
  author: {type: Schema.types.ObjectId, ref: "User" },
  title: {type: String, required: true},
  content: {type: String, required: true},
  added: {type: Date, default: Date.now },
  draft: {type: Boolean, default: false}
});

BlogSchema.virtual("timestamp").get(function () {
  return moment(this.added).format("LLLL");
});

module.exports = mongoose.model("Blog", BlogSchema);