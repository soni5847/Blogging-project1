const express = require('express');
const router = express.Router();
const authorController = require('../Controller/AuthorController.js');
const blogController = require('../Controller/BlogController.js');
const validator = require('../middleware/middleware.js')



router.post("/authors",authorController.createAuthor);
router.post("/blogs",blogController.createBlog);

router.get("/getblog",validator.authenticate,blogController.getBlog)

router.put("/updateBlogs/:blogId",validator.authenticate,validator.authorise,blogController.updateBlogs);

router.delete("/deleteBlog/:blogId",validator.authenticate,validator.authorise,blogController.deleteBlog);
router.delete("/deleteByQuery",validator.authenticate,validator.authorise,blogController.deleteByQuery);
router.post("/loginAuthor",authorController.loginAuthor);

module.exports = router;