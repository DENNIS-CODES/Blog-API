const express = require("express");
const router = express.Router();

const blog = require("../controllers/blogController");

router.get("all", blog.blog_get);
router.get("/:id/view", blog.blog_view_get);
router.post("/new", blog.new_post);
router.put(":id/update"blog.update_put);
router.delete("/:id/delete", blog.blog_delete);
router.post("./:id/comment/new", blog.comment_new_post);

module.export = router