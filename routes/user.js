const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");

async function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  const token = req.cookies.auth;
  if (bearerHeader){
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
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

router.post("/signup",user.signup_post);
router.put("/:id/update", verifyToken, user.user_get);
router.get("/me", verifyToken, user.profile_get);
router.get("/:id/blogs", verifyToken, user.blog_get);
router.get("/drafts", verifyToken, user.drafts);
router.get("/:id/comments", verifyToken, user.comment_get);

module.exports = router;