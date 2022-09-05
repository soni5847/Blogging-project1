const authorModel = require('../model/authorModel.js');

const validator = require('../validator/validator.js');
const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/





const createAuthor = async function (req, res) {
    try{
    let data = req.body;
    let {fname,lname,title,email,password}=data;
    if(!validator.isValidRequestBody(data)){
        return res.status(400).send({status:false,msg:"please provide data"})
    }
    if(!fname){
        return res.status(400).send({status:false,msg:"first name is required"})
    }
    if(!validator.fname){
        return res.status(400).send({status:false,msg:" please enter Valid first name "})
    }
    if(!lname){
        return res.status(400).send({status:false,msg:"last name is required"})
    }
    if(!validator.lname){
        return res.status(400).send({status:false,msg:" please enter Valid last name "})
    }

    if(!title){
        return res.status(400).send({status:false,msg:"title is required"})
    }
    if(!validator.title){
        return res.status(400).send({status:false,msg:" please enter Valid title "})
    }
    
    if(!email){
        return res.status(400).send({status:false,msg:"email is required"})
    }
    if(!emailRegex.test(email)){
        return res.status(400).send({status:false,msg:" email should be valid"})
    }

    if(!password){
        return res.status(400).send({status:false,msg:"password is required"})
    }
    if(!validator.fname){
        return res.status(400).send({status:false,msg:" Valid password "})
    }

    let NewData = await authorModel.create(data);
    return res.status(201).send({ message: NewData });
    }
    catch(error){
      return res.status(500).send({message:error.message})
    }
}



module.exports.createAuthor=createAuthor;