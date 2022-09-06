const express = require('express');
const router = express.Router();
const authorController = require('../Controller/AuthorController.js');
const blogController = require('../Controller/BlogController.js');
router.post("/authors",authorController.createAuthor) ;
router.post("/blogs",blogController.createBlog);
router.get("/getblogs",blogController.getBlog);
module.exports = router;