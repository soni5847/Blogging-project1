const jwt = require("jsonwebtoken");
const blogModel = require("../model/blogModel");
const authenticate = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res.status(401).send({ status: false, msg: "token must be present" });
    }
    console.log(token);
    jwt.verify(token, "functionup-plutonium-blogging-Project1-secret-key", function (error, decodedToken) {
      if (error) {
        return res.status(401).send({ status: false, msg: "Invalid Token" })
      }
      req.authorLoggedIn = decodedToken._id;
    });
    next()  
  } catch (error) {
    res.status(500).send({ msg: "server error", error: error.message })
  }
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Authorise>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const authorise = async function (req, res, next) {

  try {
    let userToBeModified = req.params.blogId
     console.log(userToBeModified)
    let blog =await blogModel.findById({_id : userToBeModified})
    console.log(blog.authorId)
    
    if (blog.authorId != req.authorLoggedIn) {
     return res.status(403).send({ status: false, msg: "Author logged  is not allowed to modify the requested data" })
    }
    next()
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message })
  }


}

module.exports.authenticate = authenticate;
module.exports.authorise = authorise;
