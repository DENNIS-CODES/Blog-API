require("dotenv").config();
const express = require("express");
const cors require("cors");
const session = require("express-session");
const cookieParser = require("cookie-Parser");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
require routes = require("./routes");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const marked = require("marked");
const app = express();

require("./passport");
require("./db");

app.use(express.static("./styles"));
app.set("view", path.join(_dirname, "views"));
app.set("view engine", "pug");
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());
const MongoStore = require("connect-mongo")(session);
const connection mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlPaser: true,
  useUnifiedTopology: true,
});
const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessions",
});
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnitialized: true,
    store: sessionStore,
    cookie: {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none"
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  app.locals.currentUser = req.user;
  next();
});

async function verifyToken(req, res, next) {
  const bearerHeader = req.headers["auhtorization"];
  const token = req.cookies.auth;
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, (error, data) => {
      if (error) {
        return res.status(403).send("Error");
      }
      req.token = bearerToken;
      next();
    });
  } else if (token) {
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user_data = decoded;
      next();
    } catch (error) {
      return res.status(403).send("Error");
    }
  } else {
    return res.status(401);
  }
}
marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  headerIds: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
});

app.get("/", async (req, res) => {
  fs.readFile("./README.md", "utf8", (err, data) => {
    if (err) {
      return res.json({ error: error });
    }
    res.render("index", { data: marked(data) });
  });
});

app.use("/auth", routes.auth);
app.use("/user", routes.user);
app.use("/blog", verifyToken, routes.blog);
app.use("/comment", verifyToken, routes.comment);

app.listen(process.env.PORT, () =>
  console.log(
    `App listening on Port ${process.env.PORT}\nhttp://localhost:${process.env.PORT}`
  )
);
