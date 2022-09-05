// { fname: { mandatory}, lname: {mandatory}, title: {mandatory, enum[Mr, Mrs, Miss]}, email: {mandatory, valid email, unique}, password: {mandatory} }
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    fname: {
        type:String,
        required:true
    },
    lname: {
        type:String,
        required:true
    },
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        required:true
    },
    email: {
        type:String,
        required:true,
        validate:[validateEmail,"please fill a valid email address"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"please fill a valid email address"],
        unique:true,
    },
    password:{
        type:string,
        required:true
    }
}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema) 