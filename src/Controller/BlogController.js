<<<<<<< HEAD
const authorModel = require('../model/blogModel')
=======
const blogModel = require('../model/blogModel.js');
>>>>>>> 3e5a700932400ef6315e94a4668483ac0d943785
const createBlog = async function (req, res) {
    let data = req.body;
    let NewData = await blogModel.find().populate(authorId);
    res.status(201).send({ message: NewData });
}
module.exports.createBlog=createBlog;
