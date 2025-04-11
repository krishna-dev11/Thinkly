const { default: mongoose } = require("mongoose");
const courses = require("../Models/courses");
const ratingAndReviews = require("../Models/ratingAndReviews");


exports.createRatingAndReviews = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, rating, reviews } = req.body;



    // console.log(courseId , "cId")
    // console.log(rating , "rating")
    // console.log(reviews,"reviews")

    if (!courseId || !rating || !reviews) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All Data",
      });
    }

    const parsedRating = parseFloat(rating);

    if (!rating || isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({
        success: false,
        message: "Invalid rating. It should be a number between 1 and 5.",
      });
    }
    


    

    // Check if course exists
    const iscourseExist = await courses.findById(courseId);
    if (!iscourseExist) {
      return res.status(400).json({
        success: false,
        message: "Course Not Found",
      });
    }

    // Check if user enrolled
    const isUserAlreadyHit = await courses.findOne({
      _id: courseId,
      studentEnrolled: userId,
    });

    if (!isUserAlreadyHit) {
      return res.status(403).json({
        success: false,
        message: "Student is not enrolled in the course",
      });
    }

    // Check if already reviewed
    const AlreadyReviewed = await ratingAndReviews.findOne({
      user: userId,
      course: courseId,
    });

    if (AlreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course already reviewed by the user",
      });
    }

    // Create the rating & review
    const createRatingandReviews = await ratingAndReviews.create({
      user: userId,
      course: courseId, 
      rating: parsedRating,
      reviews: reviews,
    });

    if (!createRatingandReviews) {
      return res.status(500).json({
        success: false,
        message: "Error in creating rating and reviews",
      });
    }


    await courses.findByIdAndUpdate(
      courseId,
      {
        $push: {
          ratingAndReviews: createRatingandReviews._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Rating and review successfully created",
      data: createRatingandReviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Some error occurred in creating the rating and reviews",
    });
  }
};


exports.getAverageRating = async (req, res) => {
  try {

    const courseId  = req.body.courseId;
    const result = await ratingAndReviews.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: "average rating is produced successfully",
        averageRating: result[0].averageRating,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Average Rating is 0, no ratings given till now",
      averageRating: 0,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "some error in producing th average rating",
    });
  }
};


exports.getAllRatingAndReviews = async (req, res) => {
  try {
    const allRatingAndReviews = await ratingAndReviews.find({})
                                                   .sort({rating:"desc"})
                                                   .populate({
                                                            path:"user",
                                                            select:"firstName lastName email imageUrl"
                                                    })
                                                    .populate({
                                                      path:"course",
                                                      select:"courseName"
                                                    }).exec();
                                                    

    return res.status(200).json({
      success: true,
      message: "All rating andreviews are fetched successfully",
      data : allRatingAndReviews
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "some error occurs on fetching all the rating and reviews data from the dataBase",
    });
  }
};


