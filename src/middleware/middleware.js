const jwt = require("jsonwebtoken");
//const blogModel=require('../model/blogModel')



//--------------------------------- AUTHENTICATION MIDDLEWARE ------------------------------------------------------------------------

// const authenticate = function (req, res, next) {
//     try {
//         let token = req.headers["x-api-key"];
//         if (!token)
//             if (!token) return res.status(401).send({ status: false, msg: "token must be present" });

//         console.log(token);

//         jwt.verify(token, "functionup-plutonium-blogging-Project1-secret-key", function (error, decodedToken) {
//             if (error)
//                 return res.status(401).send({ status: false, msg: "token is invalid" });

//             req.loggedInAuthorId = decodedToken._id
//         });
//         next()
//     } catch (error) {
//         return res.status(500).send({ status: false, Error: error.message })
//     }
// };
//--------------------------------- AUTHORISATION MIDDLEWARE ----------------------------------------------------------------------------------

// const authorise = async function (req, res, next) {
    
//     try {
//         let userToBeModified = req.params.authorId
//         console.log(userToBeModified)
        
//         let blog = await blogModel.findById({ _id: userToBeModified })
//         console.log(blog)
//         console.log(req.loggedInAuthorId)
//         if (blog.authorId != req.loggedInAuthorId) {    
//                         return res.status(403).send({ status: false, msg: 'Author logged is not allowed to modify the requested data' })
//         }
//         next()
//     } catch (err) {
//         return res.status(500).send({ status: false, msg: err.message })
//     }   
// }
// module.exports.authenticate=authenticate;
// module.exports.authorise=authorise;

// const authorise = function (req, res, next) {
//     try {

//         let authorToBeModified = req.params.authorId;
//         let authorLoggedIn = req.loggedInAuthorId

//         //userId comparision to check if the logged-in user is requesting for their own data
//         if (authorToBeModified != authorLoggedIn) return res.status(403).send({ status: false, msg: 'author logged is not allowed to modify the requested authors data' })

//         next()
//     } catch (error) {
//         res.status(500).send({ status: false, msg: error.message })
//     }
// }