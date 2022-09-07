const jwt = require("jsonwebtoken")
const authenticate = function (req, res, next) {
    let token = req.headers["x-api-key"];
    req.token = token
    if (!token)
        return res.status(401).send({ status: false, msg: "token must be present in the request header" })
     next()
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Authorization>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const authorise = function (req, res, next) {
    let decodedToken = jwt.verify(req.token, 'functionup-plutonium-blogging-Project1-secret-key')

    if (!decodedToken) return res.send({ status: false, msg: "token is not valid" })
    let authorToBeModified = req.params.authorId;
    let authorLoggedIn = decodedToken.authorId

    //userId comparision to check if the logged-in user is requesting for their own data
    if (authorToBeModified != authorLoggedIn) return res.status(403).send({ status: false, msg: 'author logged is not allowed to modify the requested authors data' })

    next()
}
module.exports.authenticate = authenticate;
module.exports.authorise = authorise;