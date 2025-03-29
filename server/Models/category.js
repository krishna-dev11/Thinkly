const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courses"
    }
     
},
{timestamps : true});

module.exports = mongoose.model("category" , categorySchema);