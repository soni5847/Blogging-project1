const authorModel = require('../model/authorModel')
const validator = require('../validator/validator.js');
const blogModel = require('../model/blogModel.js');




//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Question-2>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



const createBlog = async function (req, res) {
    try {
        let data = req.body
        if (!validator.isValidRequestBody(data)) {
            return res.status(400).send({ status: false, msg: "Provide Data" })
        }
        let { title, body, authorId, tags, category, subcategory, isDeleted, deletedAt, publishedAt, isPublished } = data;

        if (!title) {
            return res.status(400).send({ status: false, msg: "Provide title" })
        }
        if (!body) {
            return res.status(400).send({ status: false, msg: "Provide body " })
        }
        if (!authorId) {
            return res.status(400).send({ status: false, msg: "authorId missing" })
        }

        let author = authorId
        let validation = await authorModel.findById(author)
        if (!validation) {
            res.status(404).send({ status: false, msg: " author is not present" })
        }
        if (!tags) {
            return res.status(400).send({ status: false, msg: "tag missing" })
        }
        if (!category) {
            return res.status(400).send({ status: false, msg: "category missing" })
        }
        if (!subcategory) {
            return res.status(400).send({ status: false, msg: "subcategory missing" })
        }

        if (isDeleted === true) {           //if document is set to deleted true it will create timestamp
            let deletedAt = new Date()
            deletedAt = deletedAt
        }
        if (isPublished === true) {  //if document is set to published true it will create timestamp
            let publishedAt = new Date()
            publishedAt = publishedAt
        }

        let savedData = await blogModel.create(data);
        res.status(201).send({ status: true, msg: savedData })
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}



//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Question-3>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



const getBlog = async function (req, res) {
    try {
        const queries = req.query;
        if (!validator.isValidRequestBody(queries)) {  

            let data = await blogModel.find({ isDeleted: false, isPublished: true });
            if (data.length == 0) {
                return res.status(404).send({ status: "false", msg: "Sorry,Data not Found." })
            } else {
                return res.status(200).send({ status: true, msg: data });
            }
        } else {
            let data1 = await blogModel.find({           
                $or: [{ authorId: queries.authorId }, { category: queries.category },
                { tags: queries.tags }, { subcategory: queries.subcategory }]
            }).find({ isDeleted: false, isPublished: true })
            if (data1.length == 0) {
                return res.status(404).send({ status: "false", msg: "Sorry,Data not Found." })
            } else {
                return res.status(200).send({ status: true, msg: data1 });
            }
        }
    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}



//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Question-4>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



const updateBlogs = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        let availableBlog = await blogModel.findById(blogId);

        if (!availableBlog) {
            return res.status(404).send({ status: false, msg: "Blog Not Found" });
        }
        if (availableBlog.isDeleted == true) {
            return res.status(404).send({ status: false, msg: "Blog already deleted" });
        }
        //------------------------------------------Authorisation---------------------------------------------------------------//     
        let authorLoggedId = req.authorLoggedIn;
        if (availableBlog.authorId != authorLoggedId) {
            return res.status(403).send({ status: false, msg: "Unauthorized" })
        }
        //--------------------------------------------------------------------------------------------------------------------//
        let data = req.body;
        let updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId },
            {
                $set: { isPublished: true, publishedAt: new Date() },
                $push: { tags: data.tags, subcategory: data.subcategory }
            }, { new: true })

        return res.status(200).send({ status: true, data: updatedBlog });

    } catch (err) { res.status(500).send({ status: false, msg: err.message }) }
};




//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Question-5>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



const deleteBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId
        let blog = await blogModel.findById(blogId)
        if (!blog) return res.status(404).send({ status: false, msg: "Blog document does not exists" })
        //------------------------------------------Authorisation---------------------------------------------------------------//     
        let authorLoggedId = req.authorLoggedIn;
        if (blog.authorId != authorLoggedId) {
            return res.status(403).send({ status: false, msg: "Unauthorized" })
        }
        //--------------------------------------------------------------------------------------------------------------------//

        if (blog.isDeleted == true) return res.status(404).send({ status: false, msg: "Blog document is already deleted" })

        await blogModel.findOneAndUpdate(
            {_id:blogId},
            {
                $set: {isdeleted: true, deleteAt: new Date()}
                
            }
        )
        res.status(200).send({ msg: "Deleted" })
    } catch (error) {
        return res.status(500).send({ msg: error.message });
    }
}



//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Question-6>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const deleteByQuery = async function (req, res) {
    try {
        let query = req.query
        if (!validator.isValidRequestBody(query)) {
            return res.status(404).send({ status: false, msg: "please enter filter for deletion" })
        }

        let data = {
            isDeleted: false,
            authorId: req.authorLoggedIn//authorLoggedIn is present in request that we have set in authorization middleware it contains loggedIn AuthorId
        }
        data['$or'] = [
            { title: query.title },
            { isPublished: query.isPublished },
            { authorId: query.authorId },
            { category: query.category },
            { subcategory: query.subcategory },
            { tags: query.tags }
        ]

        let modification = await blogModel.find(data)
        if (modification.length == 0) {
            return res.status(404).send({ status: true, msg: "No such blog present or user is not authorised" })
        }
        await blogModel.updateMany(
            data, { $set: { isDeleted: true, deletedAt: new Date().toLocaleString() } })
        res.status(200).send({ status: true, msg: "blogs deleted" })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}



//...................................................................................................................//


module.exports.createBlog = createBlog;
module.exports.updateBlogs = updateBlogs;
module.exports.getBlog = getBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteByQuery = deleteByQuery;

