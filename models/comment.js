const mongoose = require("mongoose");
const schema = mongoose.schema;
const moment =require("moment");

const CommentSchema = new schema({
  author: { type: Schema.
  Types.ObjectId, ref: "User" },
  blog: { type: Schema.Types.ObjectId, ref: "Blog"},
  title: { type: String, required: true},
  added: {type: String, required: true },
});

CommentSchema.virtual("timestamp").get(function () {
  return moment(this.added).format("LLLL");
});

module.exports = mongoose.model("comment", CommentSchema);