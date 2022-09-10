const jwt = require("jsonwebtoken");

const authenticate = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res.status(401).send({ status: false, msg: "token must be present" });
    }
    let decodedToken = jwt.verify(token, "functionup-plutonium-blogging-Project1-secret-key");
    if (!decodedToken) {
      return res.status(401).send({ status: false, msg: "Invalid Token" })
    }
    req.authorLoggedIn = decodedToken.authorId
    next()
  } catch (error) {
    res.status(500).send({ msg: "server error", error: error.message })
  }
}
//-----------------------------------------------------------------------------------------------------------------------//
module.exports.authenticate = authenticate;

