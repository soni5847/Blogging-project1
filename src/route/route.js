const express = require('express');
const router = express.Router();
const authorController = require('../Controller/AuthorController.js');
const blogController = require('../Controller/BlogController.js');
const middleware=require('../middleware/auth.js')


router.post("/authors",authorController.createAuthor);
router.post("/blogs",authentication,blogController.createBlog);
router.get("/getblogs",authentication,blogController.getBlog);
router.put("/updateBlogs/:blogId",authentication,authorization,blogController.updateBlogs);
router.delete("/deleteBlog/:blogId",authentication,authorization,blogController.deleteBlog);
router.delete("/deleteBlogs/:blogId",authentication,blogController.blogDelete);

module.exports = router;