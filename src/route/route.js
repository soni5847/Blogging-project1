const express = require('express');
const router = express.Router();
const authorController = require('../Controller/AuthorController.js');
const blogController = require('../Controller/BlogController.js');
const validator = require('../validator/validator')



router.post("/authors",authorController.createAuthor);
router.post("/blogs",validator.authenticate,validator.authorise,blogController.createBlog);

router.get("/getblog",validator.authenticate,validator.authorise, blogController.getBlog)

router.put("/updateBlogs/:blogId",validator.authenticate,validator.authorise,blogController.updateBlogs);

router.delete("/deleteBlog/:blogId",validator.authenticate,validator.authorise,blogController.deleteBlog);
router.delete("/deleteByQuery",validator.authenticate,validator.authorise,blogController.deleteByQuery);
router.post("/loginAuthor",authorController.loginAuthor);

module.exports = router;