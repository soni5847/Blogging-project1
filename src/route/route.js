const express = require('express');
const router = express.Router();
const authorController = require('../Controller/AuthorController.js');
const blogController = require('../Controller/BlogController.js');

const middleware=require('../middleware/auth.js')




router.post("/authors",authorController.createAuthor);
router.post("/blogs",middleware.authenticate,middleware.authorise,blogController.createBlog);

router.get("/getblog",middleware.authenticate,middleware.authorise, blogController.getBlog)

router.put("/updateBlogs/:blogId",middleware.authenticate,middleware.authorise,blogController.updateBlogs);

router.delete("/deleteBlog/:blogId",middleware.authenticate,middleware.authorise,blogController.deleteBlog);
router.delete("/deleteByQuery",middleware.authenticate,middleware.authorise,blogController.deleteByQuery);
router.post("/loginAuthor",authorController.loginAuthor);


module.exports = router;