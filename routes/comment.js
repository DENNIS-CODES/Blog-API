const express = require("express");
const router = express.Router();

const comment = require("../controllers/commentController");
router.get("/:id/view", comment.comment_get);
router.put("/:id/update", comment,comment_update);
router.delete("/:id/delete", comment.comment_delete);

module.exports = router;