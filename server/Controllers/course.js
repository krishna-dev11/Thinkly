const user = require("../Models/user");
const Category = require("../Models/category");
const courses = require("../Models/courses");
const {
  uploadImageToCloudinary,
} = require("../Utilities/uploadImageToCloudinary");
const { json } = require("express");
const { path } = require("framer-motion/client");
const section = require("../Models/section");
const subsection = require("../Models/subsection");
const { default: mongoose } = require("mongoose");
const courseprogress = require("../Models/ProgressCourse");
// const { convertSecondsToDuration } = require("../Utilities/SecondsToDuration");


function convertSecondsToDuration(seconds) {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  const duration = []
  if (hrs > 0) duration.push(`${hrs}h`)
  if (mins > 0) duration.push(`${mins}m`)
  if (hrs === 0 && mins === 0) duration.push(`${secs}s`)

  return duration.join(" ")
}


// checked
exports.createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructions,
    } = req.body;

    const thumbnail = req.files?.thumbnailImage || req.body?.thumbnailImage;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category ||
      !instructions
    ) {
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
    const uploadThumbnail = await uploadImageToCloudinary(
      thumbnail,
      process.env.CLOUDINARY_FOLDER
    );

    // Create a new course
    const newCourse = await courses.create({
      courseName: courseName,
      courseDescription: courseDescription,
      price: price,
      // whatYouWillLearn:whatYouWillLearn,
      whatYouWillLearn: JSON.parse(whatYouWillLearn),
      instructor: checkInstructor._id,
      thumbnail: uploadThumbnail.secure_url,
      tag: JSON.parse(tag),
      category: categoryDetails._id,
      status: status,
      instructions: JSON.parse(instructions),
    });

    // console.log(newCourse, "newCourse");

    // Update instructor with new course
    await user.findByIdAndUpdate(
      checkInstructor._id,
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    // Update category with new course
    await Category.findByIdAndUpdate(
      category,
      {
        $push: { course: newCourse._id },
      },
      { new: true }
    );

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

exports.editCourse = async (req, res) => {
  try {
    const {
      courseId,
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructions,
    } = req.body;

    const thumbnail = req.body.thumbnailImage || req.files.thumbnailImage;

    if (
      !courseId ||
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category ||
      !instructions
    ) {
      return res.status(400).json({
        success: false,
        message: "fill add details completely and carefully",
      });
    }

    if (!status || status === undefined) {
      status = "Draft";
    }

    // console.log(status)
    // ye req me authentication ke wakt dala hai
    const userId = req.user.id;
    const checkInstructor = await user.findById(
      { _id: userId },
      {
        accountType: "Instructor",
      }
    );
    // console.log(checkInstructor)
    if (!checkInstructor) {
      return res.status(400).json({
        success: false,
        message:
          "you are not asigned with us as an instructor so the instructor has only rights of Editing the course ",
      });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "Catigory can't find in Category schema",
      });
    }

    var uploadthumbnail;
    if (!req.body.thumbnailImage) {
      uploadthumbnail = await uploadImageToCloudinary(
        thumbnail,
        process.env.CLOUDINARY_FOLDER
      );
    }

    const editCourse = await courses.findById(courseId);

    if (!editCourse) {
      throw new Error("Course not found");
    }

    editCourse.courseName = courseName;
    editCourse.courseDescription = courseDescription;
    editCourse.price = price;
    //    editCourse.whatYouWillLearn = whatYouWillLearn;
    editCourse.whatYouWillLearn =
      typeof whatYouWillLearn === "string"
        ? JSON.parse(whatYouWillLearn)
        : whatYouWillLearn;
    editCourse.instructor = checkInstructor._id;
    editCourse.thumbnail = uploadthumbnail
      ? uploadthumbnail.secure_url
      : thumbnail;
    editCourse.tag = typeof tag === "string" ? JSON.parse(tag) : tag;
    editCourse.category = categoryDetails._id;
    editCourse.status = status;
    editCourse.instructions =
      typeof instructions === "string"
        ? JSON.parse(instructions)
        : instructions;

    await editCourse.save();

    const finaleditedCourse = await courses.findById(courseId).populate({
      path: "courseContent",
      populate: { path: "subSections" },
    });

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

    // console.log(editCourse, "EditCouse");

    return res.status(200).json({
      success: true,
      data: finaleditedCourse,
      message: "course created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

// checked
exports.showAllCourse = async (req, res) => {
  try {
    const allcourses = await courses
      .find(
        {},
        {
          courseName: true,
          price: true,
          thumbnail: true,
          instructor: true,
          ratingAndReviews: true,
          studentEnrolled: true,
        }
      )
      .populate("instructor")
      .exec();

    if (!allcourses) {
      return res.status(400).json({
        success: false,
        message: "neither any of the course is present ",
      });
    }

    return res.status(200).json({
      success: true,
      data: allcourses,
      message: "all courses fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "some error occurs in fetching the all courses",
      error: error.message,
    });
  }
};

// error
exports.getAllDetailsOfOneCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const allDetails = await courses
      .findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .populate("ratingAndReviews")
      .populate("category");

    if (!allDetails) {
      return res.status(400).json({
        success: false,
        message: "Course Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "all data of courseId is fethed succcessfully",
      data: allDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "some error occurs in fetching the all related data from the data associated with the  courseId",
    });
  }
};

exports.publishCourse = async (req, res) => {
  try {
    const { courseId, status } = req.body;

    if (!status || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Please Spesify the Actuall status",
      });
    }

    if (!status || status === undefined) {
      status = "Draft";
    }

    const editCourse = await courses.findById(courseId);
    if (!editCourse) {
      throw new Error("Course not found");
    }
    editCourse.status = status;
    await editCourse.save();

    const finaleditedCourse = await courses.findById(courseId).populate({
      path: "courseContent",
      populate: { path: "subSections" },
    });

    return res.status(200).json({
      success: true,
      data: finaleditedCourse,
      message: `course ${status} successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to Publish/Draft course`,
      error: error.message,
    });
  }
};

exports.getAllCoursesOfInstructor = async (req, res) => {
  try {
    // console.log(req.body.InstructorId, "nikhil");

    const { InstructorId } = req.body;

    const CoursesData = await user
      .findById({ _id: InstructorId })
      .populate([
        {
          path: "courses",
          populate: [
            { path: "courseContent", populate: { path: "subSections" } },
            { path: "ratingAndReviews" },
            { path: "studentEnrolled" },
          ],
        },
        {
          path: "additionalDetails",
        },
      ])
      .exec();

    if (!CoursesData) {
      return res.status(400).json({
        success: false,
        message: "Courses Data Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "all data of courseId is fethed succcessfully",
      data: CoursesData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message:
        "some error occurs in fetching the all related data from the Model associated with the UserId",
    });
  }
};

exports.deleteCourseOfInstructor = async (req, res) => {
  try {
    // console.log(req.body, "nikhil");

    const { InstructorId, CourseId } = req.body;

    const CoursesData = await user
      .findByIdAndUpdate(
        InstructorId,
        {
          $pull: { courses: CourseId },
        },
        { new: true }
      )
      .populate([
        {
          path: "courses",
          populate: [
            { path: "courseContent", populate: { path: "subSections" } },
            { path: "ratingAndReviews" },
            { path: "studentEnrolled" },
          ],
        },
        {
          path: "additionalDetails",
        },
      ])
      .exec();

    await courses.findByIdAndDelete({ _id: CourseId });

    if (!CoursesData) {
      return res.status(400).json({
        success: false,
        message: "Courses Data Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "all data of courseId is fethed succcessfully",
      data: CoursesData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message:
        "some error occurs in fetching the all related data from the Model associated with the UserId",
    });
  }
};



// exports.getEnrolledCoursesDataForCardViews = async (req, res) => {
//   try {
//     const { StudentId } = req.body;

//     if (!StudentId) {
//       return res.status(400).json({
//         success: false,
//         message: "StudentId is required",
//       });
//     }

//     const Sid = new mongoose.Types.ObjectId(StudentId);

//     const userData = await user.findById({_id:StudentId})
//       .populate([
//         {
//           path: "courses",
//           populate:{
//             path:"instructor"
//           },
//           populate:{
//                         path:"courseContent"
//           }
  
//         },
//         {
//           path: "coursesProgress",
//         }
//       ])
//       .exec();


      

//     if (!userData) {
//       return res.status(404).json({
//         success: false,
//         message: "User data not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Courses and Progress data fetched successfully",
//       data: userData,
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Server error while fetching course data",
//       error: error.message,
//     });
//   }
// };


exports.getEnrolledCoursesDataForCardViews = async (req, res) => {
  try {
    const { StudentId } = req.body;

    if (!StudentId) {
      return res.status(400).json({
        success: false,
        message: "StudentId is required",
      });
    }

    const Sid = new mongoose.Types.ObjectId(StudentId);

    let userData = await user.findById(Sid)
      .populate({
        path: "courses",
        populate: [
          {
            path: "instructor",
          },
          {
            path: "courseContent",
            populate: {
              path: "subSections",
            },
          },
        ],
      })
      .exec();

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User data not found",
      });
    }

    userData = userData.toObject();

    for (let i = 0; i < userData.courses.length; i++) {
      let totalDurationInSeconds = 0;
      let totalSubsections = 0;

      for (let j = 0; j < userData.courses[i].courseContent.length; j++) {
        const subSections = userData.courses[i].courseContent[j].subSections;
        totalSubsections += subSections.length;
        totalDurationInSeconds += subSections.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration || 0),
          0
        );
      }

      userData.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);

      let CourseProgress = await courseprogress.findOne({
        courseId: userData.courses[i]._id,
        userId: Sid,
      });

      const completedCount = CourseProgress?.completedVideos?.length || 0;

      userData.courses[i].progressPercentage = totalSubsections === 0
        ? 100
        : Math.round((completedCount / totalSubsections) * 10000) / 100;
    }

    return res.status(200).json({
      success: true,
      message: "Courses and progress data fetched successfully",
      data: userData,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching course data",
      error: error.message,
    });
  }
};

exports.getCartCoursesData = async (req, res) => {
  try {
    const { CoursesIds } = req.body;

    if (!CoursesIds) {
      return res.status(400).json({
        success: false,
        message: "CoursesIds is required",
      });
    }

    const CoursesData = []

    for(const course_id of CoursesIds) {
      let course;
      try{
         
          course = await courses.findById(course_id);
          if(!course) {
              return res.status(200).json({success:false, message:"Could not find the course"});
          }

        CoursesData.push(course)
      }
      catch(error) {
          console.log(error);
          return res.status(500).json({success:false, message:error.message});
      }
  }

  return res.status(200).json({
    success:true,
    message:" cart courses Fetched Successfully",
    data : CoursesData
  })

    }catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching course data",
      error: error.message,
    });
  }
};

exports.AddCourseInCart = async (req, res) => {
  try {
    const { CourseId, UserID } = req.body;

    // console.log(req.body);

    if (!CourseId || !UserID) {
      return res.status(400).json({
        success: false,
        message: "CourseId and UserID are required",
      });
    }

    const User = await user.findById(UserID).populate("cart").exec();

    if (!User) {
      return res.status(404).json({
        success: false,
        message: "User not found in the database",
      });
    }

    const isAlreadyInCart = User.cart.some((course) =>
      course._id.toString() === CourseId
    );

    if (isAlreadyInCart) {
      return res.status(400).json({
        success: false,
        message: "Course already exists in the cart",
      });
    }

    const updatedUser = await user.findByIdAndUpdate(
      UserID,
      {
        $push: {
          cart: new mongoose.Types.ObjectId(CourseId),
        },
      },
      { new: true }
    ).populate([
      {
        path:"additionalDetails"
      },{
        path:"cart",
        populate:{
          path:"instructor"
        }
      },{
        path:"coursesProgress"
      }
    ])

    return res.status(200).json({
      success: true,
      message: "Course added to cart successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while adding course to cart",
      error: error.message,
    });
  }
};


exports.RemoveCourseInCart = async (req, res) => {
  try {
    const { CourseId , UserID } = req.body;

    // console.log(req.body);

    if (!CourseId || !UserID) {
      return res.status(400).json({
        success: false,
        message: "CourseId and UserID are required",
      });
    }

    
    const updatedUser = await user.findByIdAndUpdate(
      UserID,
      {
        $pull : {
          cart: new mongoose.Types.ObjectId(CourseId),
        },
      },
      { new: true }
    ).populate([
      {
        path:"additionalDetails"
      },{
        path:"cart",
        populate:{
          path:"instructor"
        }
      },{
        path:"coursesProgress"
      }
    ])

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found in the database",
      });
    }


    return res.status(200).json({
      success: true,
      message: "Course Removed from cart successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while adding course to cart",
      error: error.message,
    });
  }
};

exports.EmptyCart = async (req, res) => {
  try {
    const {  UserID } = req.body;

    // console.log(req.body  , " ha bhai sabh badhiya hai");

    if ( !UserID) {
      return res.status(400).json({
        success: false,
        message: "UserID are required",
      });
    }

    
    const updatedUser = await user.findByIdAndUpdate(
      UserID,
      {
        $set: {
          cart: []
        },
      },
      { new: true }
    ).populate([
      {
        path: "additionalDetails"
      },
      {
        path: "cart",
        populate: {
          path: "instructor"
        }
      },{
        path:"coursesProgress"
      }
    ]);
    

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found in the database",
      });
    }


    return res.status(200).json({
      success: true,
      message: "Course Removed from cart successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while adding course to cart",
      error: error.message,
    });
  }
};


exports.updateCourseProgress = async(req,res) => {
  const {courseId, subSectionId} = req.body;
  const userId = req.user.id;

  try{
      //check if the subsection is valid
      const subSection = await subsection.findById(subSectionId);

      if(!subSection) {
          return res.status(404).json({error:"Invalid SUbSection"});
      }

      // console.log("SubSection Validation Done");

      //check for old entry 
      let CourseProgress = await courseprogress.findOne({
          courseId:courseId,
          userId:userId,
      });
      if(!CourseProgress) {
          return res.status(404).json({
              success:false,
              message:"Course Progress does not exist"
          });
      }
      else {
          // console.log("Course Progress Validation Done");

          if(CourseProgress.completedVideos.includes(subSectionId)) {
              return res.status(400).json({
                  error:"Subsection already completed",
              });
          }

          CourseProgress.completedVideos.push(subSectionId);
          // console.log("Copurse Progress Push Done");
      }
      await CourseProgress.save();

      const updatedUser = await user.findById(userId).populate([
        {
          path: "additionalDetails"
        },
        {
          path: "cart",
          populate: {
            path: "instructor"
          }
        },{
          path:"coursesProgress"
        }
      ]);


      // console.log("Course Progress Save call Done");
      return res.status(200).json({
          success:true,
          message:"Course Progress Updated Successfully",
          data:updatedUser
      })
  }
  catch(error) {
      console.error(error);
      return res.status(400).json({error:"Internal Server Error"});
  }
}



