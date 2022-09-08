const authorModel = require('../model/authorModel.js');
const validator = require('../validator/validator.js');
const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
const jwt = require('jsonwebtoken');

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Question-1>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        let { fname, lname, title, email, password } = data;
        if(!validator.isValidRequestBody) {
            return res.status(400).send({ status: false, msg: "please provide data" })
        }
        if (!fname) {
            return res.status(400).send({ status: false, msg: "first name is required" })
        }
        if (!email) {
            return res.status(400).send({ status: false, msg: "email is required" })
        }
        if (!emailRegex.test(email)) {
            return res.status(400).send({ status: false, msg: " email should be valid" })
        }

        if (!password) {
            return res.status(400).send({ status: false, msg: "password is required" });
        }

        let NewData = await authorModel.create(data);
        return res.status(201).send({ message: NewData });
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>TOKEN GENERATE FOR LOGGEDIN USER>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



const loginAuthor = async function (req, res) {
  try{
    let userName = req.body.email;
    let password = req.body.password;
  
    let user = await authorModel.findOne({ email: userName, password: password });
    if(!userName){
      return res.status(401).send({
        status: false,
        msg: "username is required",
      });
    }
    if(!password){
      return res.status(401).send({
        status: false,
        msg: "password is required",
      });
    }
    if (!user)
      return res.status(401).send({
        status: false,
        msg: "username or the password is not corerct",
      });
  
    
    let token = jwt.sign(
      {
        authorId: user._id.toString(),
        Team: "Group 14",
        organisation: "FunctionUp",
      },
      "functionup-plutonium-blogging-Project1-secret-key"
    );
    res.setHeader("x-api-key", token);
    res.send({ status: true, token: token });
  }catch(error){
    return res.status(500).send({status:false,msg:error.message})
  }
  };

//....................................................................................................................//

module.exports.createAuthor=createAuthor;
module.exports.loginAuthor=loginAuthor;

//....................................................................................................................//