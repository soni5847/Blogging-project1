const isValidRequestBody = function(requestBody){
    return Object.keys(requestBody).length >0//Object.keys return array of keys.

}
// const isValid = function (value) {
//     if (typeof value !== "string")   return false
//     if (typeof value === 'string' && value.trim().length === 0) return false        
//     return true;
// };

const authorAuthenticate = async function(req, req, next) {
    try{let token = req.headers["x-api-key"]
    if(!token) return res.status(404).send({status: false, msg: "token must be present in the request header"})
    let decodedToken = jwt.verify(token, 'functionup-plutonium-blogging-Project1-secret-key')

    if(!decodedToken) return res.status(400).send({status: false, msg:"token is not valid"})
    
    
   
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




module.exports={isValidRequestBody}
module.exports={authorAuthenticate}

