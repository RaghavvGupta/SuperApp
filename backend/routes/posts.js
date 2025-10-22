const express = require("express");
const router = express.Router();
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const auth = require("../middleware/auth");

router.post("/create", auth, createPost);
router.get("/:id", auth, getPost);
router.put("/update/:id", auth, updatePost);
router.delete("/delete/:id", auth, deletePost);

module.exports = router;
