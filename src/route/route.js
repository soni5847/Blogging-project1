const express = require('express');
const router = express.Router();
const authorController = require('../Controller/AuthorController.js');
const blogController = require('../Controller/BlogController.js');



router.post("/authors",authorController.createAuthor);
router.post("/blogs",blogController.createBlog);

router.get("/blogData/:blogId", blogController.getBlog)

router.put("/updateBlogs/:blogId",blogController.updateBlogs);

router.delete("/deleteBlog/:blogId",blogController.deleteBlog);
router.delete("/deleteByQuery",blogController.deleteByQuery);
router.post("/loginAuthor",blogController.loginAuthor);

module.exports = router;