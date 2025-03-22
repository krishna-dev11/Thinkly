const courses = require("../Models/courses");
const section = require("../Models/section");
const subsection = require("../Models/subsection");
const {
  uploadImageToCloudinary,
  deleteVideoTOCloudinary,
  updateVideoTOCloudinary,
} = require("../Utilities/uploadImageToCloudinary");

// checked
exports.createSubSection = async (req, res) => {
  try {
    const { subSectionName, description, sectionId, timeDuration, CourseId } =
      req.body;

    // Check if lecture video is provided
    if (!req.files || !req.files.lectureVideo) {
      return res.status(400).json({
        success: false,
        message: "Lecture video is required.",
      });
    }

    const lectureVideo = req.files.lectureVideo;

    // Validate all required fields
    if (
      !subSectionName ||
      !description ||
      !timeDuration ||
      !CourseId ||
      !sectionId
    ) {
      return res.status(404).json({
        success: false,
        message: "Please provide all details carefully and completely",
      });
    }

    // Upload video to Cloudinary
    let uploadCloudinary;
    try {
      uploadCloudinary = await uploadImageToCloudinary(
        lectureVideo,
        process.env.CLOUDINARY_FOLDER
      );
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload video to Cloudinary",
        error: error.message,
      });
    }

    // Create Subsection
    let createSubsection;
    try {
      createSubsection = await subsection.create({
        title: subSectionName,
        timeDuration: timeDuration,
        description: description,
        videoUrl: uploadCloudinary.secure_url,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create subsection",
        error: error.message,
      });
    }

    // Update Section
    let updatedSection;
    try {
      updatedSection = await section
        .findByIdAndUpdate(
          { _id: sectionId },
          { $push: { subSections: createSubsection._id } },
          { new: true }
        )
        .populate("subSections")
        .exec();

      if (!updatedSection) {
        return res.status(400).json({
          success: false,
          message: "Section not found with the provided sectionId",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update section",
        error: error.message,
      });
    }

    // Update Course
    let updatedCourse;
    try {
      updatedCourse = await courses.findById({ _id: CourseId }).populate({
        path: "courseContent",
        populate: { path: "subSections" },
      });

      if (!updatedCourse) {
        return res.status(400).json({
          success: false,
          message: "Course not found with the provided CourseId",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update course",
        error: error.message,
      });
    }

    // Success Response
    return res.status(200).json({
      success: true,
      message: "Subsection created successfully",
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occurred while creating the subsection",
      error: error.message,
    });
  }
};

// ye mene likha hai

// exports.updateSubSection = async(req , res)=>{
//     try{

//         const {subSectionId , subSectionName , description , timeDuration} = req.body;

//         const lecturevideo = req.files.lectureVideo;

//         if(!subSectionName || !timeDuration || !description || !lecturevideo ){
//             return res.status(400).json({
//                 success:false,
//                 message:"please provide all details carefully and completely"
//             })
//         }

//         const existingSubSection = await subsection.findById(subSectionId);
//         if (!existingSubSection) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Subsection not found with the given ID",
//             });
//         }

//         if(subSectionName !== undefined){
//             existingSubSection.title = subSectionName
//         }

//         if(description !== undefined){
//             existingSubSection.description = description
//         }

//         // ye mene likha hai so check it
//         let public_id = "";
//         if (existingSubSection.videoUrl) {
//             const urlParts = existingSubSection.videoUrl.split("/");
//             public_id = urlParts[urlParts.length - 1].split(".")[0]; // `.mp4` हटाने के लिए
//         }

//         const updatecloudinaryvideo = await updateVideoTOCloudinary(lecturevideo.tempFilePath  ,process.env.CLOUDINARY_FOLDER , public_id , 720 , "auto")

//         const updatedsubsection = await subsection.findByIdAndUpdate({_id : subSectionId},
//             {
//                 title:subSectionName,
//                 timeDuration:timeDuration,
//                 description:description,
//                 videoUrl : updatecloudinaryvideo.secure_url
//             }
//         )

//         if(!updatedsubsection){
//             return res.status(400).json({
//                 success:false,
//                 message:"subsection is not present with these subsectionId"
//             })
//         }

//         return res.status(200).json({
//             success:true,
//             message:"subsection updated successfully"
//         })

//     }catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"some error occurs on updating a subsection"
//         })
//     }
// }

exports.updateSubSection = async (req, res) => {
  try {
    const {
      SubSectionId,
      CourseId,
      subSectionName,
      timeDuration,
      description,
    } = req.body;

    const lectureVideo = req.files.lectureVideo;

    if (
      !SubSectionId ||
      !subSectionName ||
      !timeDuration ||
      !description ||
      !CourseId
    ) {
      return res.status(400).json({
        success: false,
        message: "Please Provide all details",
      });
    }

    if (!lectureVideo) {
      return res.status(400).json({
        success: false,
        message: "Lecture video is required.",
      });
    }

    try {

      const UpdatesubSection = await subsection.findById(SubSectionId);

      UpdatesubSection.title = subSectionName;
      UpdatesubSection.description = description;

      const uploadDetails = await uploadImageToCloudinary(
        lectureVideo,
        process.env.CLOUDINARY_FOLDER
      );
      UpdatesubSection.videoUrl = uploadDetails.secure_url;
      UpdatesubSection.timeDuration = `${uploadDetails.timeDuration}`;

      await UpdatesubSection.save();

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Updation of SubSection Failed",
        error: error.message,
      });
    }

    const updatedCourse = await courses.findById({ _id: CourseId });

    return res.status(200).json({
      success: true,
      message: "Subsection Updted successfully",
      data: updatedCourse,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    });
  }
};
// checked

// ye mene likha hai
// exports.deleteSubSection = async(req , res)=>{
//     try{

//         const { subSectionId  ,  sectionId} = req.body;

//         if( !subSectionId ){
//             return res.status(400).json({
//                 success:false,
//                 message:"please provide all details carefully and completely"
//             })
//         }

//         const existingSubSection = await subsection.findById(subSectionId);
//         if (!existingSubSection) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Subsection not found with the given ID",
//             });
//         }

//         let public_id = ""
//         if(existingSubSection.videoUrl){
//             const urlParts = existingSubSection.videoUrl.split("/");
//             public_id = urlParts[urlParts.length - 1].split(".")[0];
//         }
//         const deletecloudinaryvideo = await deleteVideoTOCloudinary(public_id);

//         const deletesubsectioninDatabase = await subsection.findByIdAndDelete({_id:subSectionId})

//         await section.findByIdAndDelete({_id : sectionId},
//             {
//                 $pull : {
//                     subSections : subSectionId
//                 }
//             },
//             {new : true}
//         )

//         return res.status(200).json({
//             success:true,
//             message:"subsection updated successfully"
//         })

//     }catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"some error occurs on updating a subsection"
//         })
//     }
// }

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;
    await section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSections: subSectionId,
        },
      }
    );
    const subSection = await subsection.findByIdAndDelete({
      _id: subSectionId,
    });

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" });
    }

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    });
  }
};
// checked
