const isValidRequestBody = function(requestBody){
    return Object.keys(requestBody).length >0//Object.keys return array of keys.

}
// const isValid = function (value) {
//     if (typeof value !== "string")   return false
//     if (typeof value === 'string' && value.trim().length === 0) return false        
//     return true;
// };

module.exports={isValidRequestBody}

