const express = require('express');
const router = express.Router();
const authorController = require('../Controller/AuthorController.js');
const blogController = require('../Controller/BlogController.js');
// const middleware=require('../middleware/middleware.js')


router.post("/authors",authorController.createAuthor);
router.post("/blogs",blogController.createBlog);

router.get("/blogData/:blogId", blogController.getBlog)

router.put("/updateBlogs/:blogId",blogController.updateBlogs);

// router.delete("/blogDelete",blogController.blogDelete);
router.delete("/deleteBlog/:blogId",blogController.deleteBlog);
router.delete("/deleteByQuery",blogController.deleteByQuery);

module.exports = router;