const jwt = require("jsonwebtoken");
const passport = require("passport");

exports.login_post = (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "something is not right",
        user: user,
      });
    }
    req.login(user, (err) => {
      if (err) {
        res.json(err);
      }
      const body = {
        _id: user._id,
        firstname: user.firstname,
      };
      const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
      res.cookie("auth", token, {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "none",
      });
      res.json({ user, token });
    });
  })(req, res);
};

exports.logout_post = (req, res) => {
  req.logout();
  res.clearCookie("auth");
  res.clearCookie("connect.sid");
  req.session.destroy((err) => {
    if (err) throw new Error(err);
    res.json({ message: "Logged out successfully"});
  });
};