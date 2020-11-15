const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

exports.signup_post = async (req, res) => {
  try {
    const exists = await User.findOne({ username: req.body.username });
    if (exists) {
      return res.json({
        error: "User already existed. Try a diffrent username",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: hashedPassword,
    }).save();
    res.json({ user, message: "Signup Successful" });
  }
} 