const jwt = require("jsonwebtoken")
const blogModel = require('../model/blogModel.js');
const authenticate = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) {
            return res.status(404).send({ status: false, msg: "token must be present" });
        }
        console.log(token);
        let decodedToken = jwt.verify(token, "functionup-plutonium-blogging-Project1-secret-key")
        if (!decodedToken) {
            return res.status(400).send({ status: false, msg: "token is invalid" });
        }
        // req.loggedInUser = decodedToken.userId
        req.authorLoggedIn = decodedToken.authorId
        next()

    } catch (err) {
        res.status(500).send({ msg: "server error", error: err })
    }

}
//     let token = req.headers["x-api-key"];
//     req.token = token
//     if (!token)
//         return res.status(401).send({ status: false, msg: "token must be present in the request header" })
//      next()
// }

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Authorization>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// const authorise = function (req, res, next) {
//     let decodedToken = jwt.verify(req.token, 'functionup-plutonium-blogging-Project1-secret-key')

//     if (!decodedToken) return res.send({ status: false, msg: "token is not valid" })
//     let authorToBeModified = req.params.authorId;
//     let authorLoggedIn = decodedToken.authorId

//     //userId comparision to check if the logged-in user is requesting for their own data
//     if (authorToBeModified != authorLoggedIn) return res.status(403).send({ status: false, msg: 'author logged is not allowed to modify the requested authors data' })

//     next()
// }

const authorise = async function (req, res, next) {

    try {
       //let token = req.headers["x-api-key"];
       //let authordata = jwt.verify(token, "BloggingWebsite");
  
      let userToBeModified = req.params.blogId
      console.log(userToBeModified)
  
      let blog = await blogModel.findById({ _id: userToBeModified })    //id in blogModel is same as getting from req.params or not
      //let userLoggedIn = decodedToken._id
      console.log(blog)
      console.log(req.authorLoggedIn)
      if (blog.authorId !== req.authorLoggedIn) {    //We have stored decoded token into req.loggedInAuthorId and comparing it with blog.authorId
        return res.status(403).send({ status: false, msg: 'Author logged is not allowed to modify the requested data' })
      }
      next()
    } catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
    }
  
  
  }
  
module.exports.authenticate = authenticate;
module.exports.authorise = authorise;



// const isValid = function (value) {
//     if (typeof value !== "string")   return false
//     if (typeof value === 'string' && value.trim().length === 0) return false        
//     return true;
// };

// const authorAuthenticate = async function(req, req, next) {
//     try{let token = req.headers["x-api-key"]
//     if(!token) return res.status(404).send({status: false, msg: "token must be present in the request header"})
//     let decodedToken = jwt.verify(token, 'functionup-plutonium-blogging-Project1-secret-key')

//     if(!decodedToken) return res.status(400).send({status: false, msg:"token is not valid"})
    
    
   
//     let authorToBeModified = req.params.authorId
    
//     let authorLoggedIn = decodedToken.authorId

//     //userId comparision to check if the logged-in user is requesting for their own data
//     if(authorToBeModified != authorLoggedIn) return res.send({status: false, msg: 'Author logged is not allowed to modify the requested authors data'})

//     let author = await authorModel.findById(req.params.authorId)
//     if(!author) return res.status(404).send({status: false, msg: 'No such Author exists'})

//     res.status(200).send({status: true, msg: "Author is Valid "})
// } catch(error) {
//     res.status(500).send({status:false, msg: error.message})

// }
// }













// const jwt = require("jsonwebtoken")
// const authenticate = function (req, res, next) {
//     let token = req.headers["x-api-key"];
//     req.token = token
//     if (!token)
//         return res.status(401).send({ status: false, msg: "token must be present in the request header" })
//      next()
// }

// //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Authorization>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// const authorise = function (req, res, next) {
//     let decodedToken = jwt.verify(req.token, 'functionup-plutonium-blogging-Project1-secret-key')

//     if (!decodedToken) return res.send({ status: false, msg: "token is not valid" })
//     let authorToBeModified = req.params.authorId;
//     let authorLoggedIn = decodedToken.authorId

//     //userId comparision to check if the logged-in user is requesting for their own data
//     if (authorToBeModified != authorLoggedIn) return res.status(403).send({ status: false, msg: 'author logged is not allowed to modify the requested authors data' })

//     next()
// }
// module.exports.authenticate = authenticate;
// module.exports.authorise = authorise;