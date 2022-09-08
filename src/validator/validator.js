//const jwt = require("jsonwebtoken")

const isValidRequestBody = function(requestBody){
    return Object.keys(requestBody).length >0//Object.keys return array of keys.

}






module.exports.isValidRequestBody=isValidRequestBody;
