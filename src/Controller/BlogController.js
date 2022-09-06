const blogModel = require('../model/blogModel.js');
const createBlog = async function (req, res) {
    let data = req.body;
    let NewData = await blogModel.find().populate(authorId);
    res.status(201).send({ message: NewData });
}
module.exports.createBlog = createBlog;
const getBlog = async function (req, res) {
    try {
        let body = req.query;
        let data = await blogModel.find({ isDeleted: false, isPublished: true, ...body });
        if (!data) {
            return res.status(404).send({ status: "false", msg: "Sorry,Data not Found." })
        }
        else {
            return res.status(200).send({ status: true, msg: data });
        }
    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }

}

module.exports.getBlog=getBlog