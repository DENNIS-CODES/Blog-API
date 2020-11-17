const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("./models/user");

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          return done(null, false, { msg: "Inocrrect username" });
        }
        bcrypt.compare(password, user.password, (err, data) => {
          if (data) {
            return done(null, user);
          } else {
            return done(null, false, { msg: "Incorrect password" });
          }
        });
      })
      .catch((err) => {
        return done(err);
      });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});
