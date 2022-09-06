
const authorModel = require('../model/authorModel')
const validator = require('../validator/validator.js');

const blogModel = require('../model/blogModel.js');





const createBlog = async function (req, res) {
    try {
        let data = req.body
        let author = data.authorId
        let validation = await authorModel.findById(author)
        if (!validation) {
            res.status(400).send({ status: false, msg: " author is not present" })
        }
        if (data.isPublished) data.publishedAt = new Date()
        if (data.isDeleted) data.deletedAt = new Date()

        let savedData = await blogModel.create(data);
        res.status(201).send({ status: true, msg: savedData })
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}
module.exports.createBlog = createBlog

    
// const createBlog = async function (req, res) {
//     try {
//         let data = req.body
//         let author = data.authorId
//         let validation = await authorModel.findById(author)
//         if (!validation) {
//             res.status(400).send({ status: false, msg: " author is not present" })
//         }
//         if (data.isPublished) data.publishedAt = new Date()
//         if (data.isDeleted) data.deletedAt = new Date()

//         let savedData = await blogModel.create(data);
//         res.status(201).send({ status: true, msg: savedData })
//     } catch (err) {
//         res.status(500).send({ msg: err.message })
//     }
// }

// module.exports.createBlog=createBlog;


    
    
