// const blogModel = require("../model/blogModel")

// const mid=async function(req,res,next)
// {
//    try{
//     const Id=req.params.blogId
//     if(!Id)return res.status(400).send({status:false,msg:"BlogId Is A Mandatory Field"});
//    const data=await blogModel.find({_id:Id})
//    if(data==0)
//    return res.status(404).send({status:false,msg:"not valid Id"}) 
//    const data1=await blogModel.find({_id:Id,isDeleted:false})
//    if(data1.length==0)
//    return res.status(404).send({status:false,msg:"this blog is already deleted"})
//    next()
//    }
//    catch(error)
//    {
//     return res.status(500).send({status:false,msg:error.message})
//    }
   

// }
// module.exports.mid=mid