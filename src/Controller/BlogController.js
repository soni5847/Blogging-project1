const authorModel = require('../model/blogModel')
const createBlog = async function (req, res) {
    let data = req.body;
    let NewData = await blogModel.find().populate(authorId);
    res.status(201).send({ message: NewData });
}
module.exports.createBlog=createBlog;
