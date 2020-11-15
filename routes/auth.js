const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

router.post("/login", auth,login_post);


router.post("logout", auth,logout_post);

module.exports = router;