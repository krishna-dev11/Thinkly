const courses = require("../Models/courses");
const section = require("../Models/section");
// const user = require("../Models/user");

// checked
exports.createSection = async(req , res)=>{
    try{

        const{sectionName , courseId} = req.body;

        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message : "plaease enter section name carefully"
            })
        }

        const newsection = await section.create({sectionName : sectionName})
        // console.log(newsection)
        const updateCourse = await courses.findByIdAndUpdate(
            { _id: courseId },
            { $push: { courseContent: newsection._id } },
            { new: true }
        ).populate({
            path: "courseContent",
            populate: { path: "subSections" }
        });
        
console.log("hi")
        return res.status(200).json({
            success:true,
            message:"section created successfully",
            data : updateCourse
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"some error occurs on creating the section"
        })
    }
}

// checked
exports.updateSection = async(req , res)=>{
    try{

        const {sectionName , sectionId} = req.body;

        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"please enter a section name carefully"
            })
        }

        const updatedSection = await section.findByIdAndUpdate({_id : sectionId},
            {
                sectionName:sectionName
            },
            {new:true}
        )

        if(!updatedSection){
            return res.status(400).json({
                success:false,
                message:"section with these section Id is not present in section schema"
            }) 
        }

        return res.status(200).json({
            success:true,
            message:"section Updated successfully"
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"some error occurs on updating a section"
        })
    }
}

// checked but some error
exports.deleteSection = async(req , res)=>{
    try{

        // const {sectionId} = req.params;
        const {sectionId , courseId} = req.body;


        const deletedSection = await section.findByIdAndDelete({_id : sectionId});

        const deletesectionEnteryFromCourse = await courses.findByIdAndUpdate({_id:courseId},
            {
                $pull:{
                    courseContent : courseId
                }
            },
        {new:true}
    )

        if(!deletedSection){
            return res.status(400).json({
                success:false,
                message:"section with these section Id is not present in section schema"
            }) 
        }
        
        return res.status(200).json({
            success:true,
            message:"section deleted successfully"
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"some error occurs on deleting a section"
        })
    }
}

