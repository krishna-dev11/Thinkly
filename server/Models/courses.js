const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({

    courseName:{      
        type:String,
    },
    courseDescription:{
        type:String,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    whatYouWillLearn:{
        type:String,
        required:true
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"section"
    }],
    ratingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ratingAndReviews"
    }],
    price:{
       type:String,
    },
    thumbnail:{
        type:String,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    studentEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    instructions:{
        type:[String]
    },
    status : {
        type :String,
        enum : ["Draft" , "Published"]
    }

});

module.exports = mongoose.model("courses" , coursesSchema);