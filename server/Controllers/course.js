const user = require("../Models/user");
const Category = require("../Models/category");
const courses = require("../Models/courses");
const {uploadImageToCloudinary} = require("../Utilities/uploadImageToCloudinary");
const { json } = require("express");


// checked
exports.createCourse = async (req, res) => {
    try {

        const { courseName , courseDescription , whatYouWillLearn , price , tag , category , status , instructions } = req.body;

        const thumbnail = req.files?.thumbnailImage || req.body?.thumbnailImage;
        

        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category || !instructions) {
            return res.status(400).json({
                success: false,
                message: "Please fill all details completely and carefully",
            });
        }

        // Default status
        if (!status) {
            status = "Draft";
        }

        // Ensure `tag` is an array
        // if (typeof tag === "string") {
        //     try {
        //         tag = JSON.parse(tag);
        //     } catch (error) {
        //         return res.status(400).json({
        //             success: false,
        //             message: "Invalid format for tag. It should be an array.",
        //         });
        //     }
        // }
        // if (!Array.isArray(tag) || tag.length === 0) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Tag must be a non-empty array.",
        //     });
        // }

        // // Ensure `instructions` is an array
        // if (typeof instructions === "string") {
        //     try {
        //         instructions = JSON.parse(instructions);
        //     } catch (error) {
        //         return res.status(400).json({
        //             success: false,
        //             message: "Invalid format for instructions. It should be an array.",
        //         });
        //     }
        // }
        // if (!Array.isArray(instructions) || instructions.length === 0) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Instructions must be a non-empty array.",
        //     });
        // }



        // Check if user is an instructor
        const userId = req.user.id;
        const checkInstructor = await user.findById(userId);
        if (!checkInstructor || checkInstructor.accountType !== "Instructor") {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to create a course.",
            });
        }

        // Check if category exists
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(400).json({
                success: false,
                message: "Category not found.",
            });
        }

        // Upload thumbnail to Cloudinary
        const uploadThumbnail = await uploadImageToCloudinary(thumbnail, process.env.CLOUDINARY_FOLDER);

        // Create a new course
        const newCourse = await courses.create({
            courseName:courseName,
            courseDescription:courseDescription,
            price:price,
            whatYouWillLearn:whatYouWillLearn,
            instructor: checkInstructor._id,
            thumbnail: uploadThumbnail.secure_url,
            tag : JSON.parse(tag) ,
            category: categoryDetails._id,
            status : status,
            instructions : JSON.parse(instructions)
        });

        console.log(newCourse , "newCourse") 

        // Update instructor with new course
        await user.findByIdAndUpdate(checkInstructor._id, {
            $push: { courses: newCourse._id }
        }, { new: true });

        // Update category with new course
        await Category.findByIdAndUpdate(category, {
            $push: { course: newCourse._id }
        }, { new: true });

        return res.status(201).json({
            success: true,
            data: newCourse,
            message: "Course created successfully.",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create course.",
            error: error.message,
        });
    }
};


exports.editCourse = async(req , res)=>{
    try{
        const {courseId , courseName , courseDescription ,  whatYouWillLearn , price  , tag , category , status , instructions } = req.body ;

        const thumbnail = req.body.thumbnailImage || req.files.thumbnailImage


        if(!courseId || !courseName || !courseDescription || !whatYouWillLearn || !price || !tag  || !thumbnail  || !category  || !instructions ){
            return res.status(400).json({
                success: false,
                message:"fill add details completely and carefully",
              });
        }

        
        if (!status || status === undefined) {
			status = "Draft";
            
		}
        
// console.log(status)
// ye req me authentication ke wakt dala hai
        const userId = req.user.id
        const checkInstructor = await user.findById({ _id:userId } , 
            {
                accountType : "Instructor"
            }
        )
        // console.log(checkInstructor)
        if(!checkInstructor){
            return res.status(400).json({
                success: false,
                message:"you are not asigned with us as an instructor so the instructor has only rights of Editing the course ",
              });
        }

        const categoryDetails = await  Category.findById(category)
        if(!categoryDetails){
            return res.status(400).json({
                success: false,
                message:"Catigory can't find in Category schema",
              });
        }

       var uploadthumbnail 
       if(!req.body.thumbnailImage){
        uploadthumbnail = await uploadImageToCloudinary(thumbnail , process.env.CLOUDINARY_FOLDER);
       }


       const editCourse = await courses.findById(courseId);

       if (!editCourse) {
        throw new Error("Course not found"); 
       }

       editCourse.courseName = courseName;
       editCourse.courseDescription = courseDescription;
       editCourse.price = price;
       editCourse.whatYouWillLearn = whatYouWillLearn;
       editCourse.instructor = checkInstructor._id;
       editCourse.thumbnail = uploadthumbnail ? uploadthumbnail.secure_url : thumbnail;
       editCourse.tag = typeof tag === "string" ? JSON.parse(tag) : tag;
       editCourse.category = categoryDetails._id;
       editCourse.status = status;
       editCourse.instructions = typeof instructions === "string" ? JSON.parse(instructions) : instructions;

       await editCourse.save()

       const finaleditedCourse = await courses.findById(courseId).populate({
        path: "courseContent",
        populate: { path: "subSections" }
    })



        // const editCourse = await courses.findByIdAndUpdate({_id: courseId},{
        //     courseName,
        //     courseDescription,
        //     price,
        //     whatYouWillLearn,
        //     instructor : checkInstructor._id,
        //     thumbnail: uploadthumbnail ? uploadthumbnail.secure_url  : thumbnail ,
        //     tag : JSON.parse(tag),
        //     category : categoryDetails._id,
        //     status: status,
        //     instructions : JSON.parse(instructions)

        // }).populate({
        //     path: "courseContent",
        //     populate: { path: "subSections" }
        // });

        console.log(editCourse , "EditCouse")


        return res.status(200).json({
            success: true,
            data : finaleditedCourse,
            message:"course created successfully",
          });

    }catch(error){
        return res.status(500).json({
            success: false,
            message:"Failed to create course",
            error : error.message
          });
    }
};

// checked
exports.showAllCourse = async(req , res)=>{
    try{
  
        const allcourses = await courses.find({},
            {
                courseName : true ,
                price : true ,
                thumbnail : true ,
                instructor : true,
                ratingAndReviews : true ,
                studentEnrolled : true
            }
        ).populate("instructor")
        .exec();

        if(!allcourses){
            return res.status(400).json({
                success: false,
                message:"neither any of the course is present ",
              });
        }

        return res.status(200).json({
            success: true,
            data:allcourses,
            message:"all courses fetched successfully",
          });

    }catch(error){
        return res.status(500).json({
            success: false,
            message:"some error occurs in fetching the all courses",
            error:error.message
          }); 
    }
}

// error
exports.getAllDetailsOfOneCourse  = async(req , res)=>{
    try{

        const courseId = req.body;
       console.log(courseId)
        const allDetails = await courses.findById(courseId)
                            .populate({
                                path:"instructor",
                                populate : {
                                     path : "additionalDetails"
                                }
                            })
                            .populate({
                                path:"courseContent",
                                populate :{
                                    path:"subSections"
                                }
                            })
                            .populate("ratingAndReviews")
                            .populate("category");
                            
       
       if(!allDetails){
        return res.status(400).json({
            success:false,
            message:'Course Not Found'
        })
       }                     

       return res.status(200).json({
        success:true,
        message:'all datas of courseId is fethed succcessfully',
        data:allDetails
       })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:'some error occurs in fetching the all related data from the data associated with the  courseId'
        })
    }
}

