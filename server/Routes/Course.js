const express = require("express")
const router = express.Router();

// import Controllers
const {createCourse , showAllCourse , editCourse ,  getAllDetailsOfOneCourse , publishCourse , getAllCoursesOfInstructor , deleteCourseOfInstructor  , getEnrolledCoursesDataForCardViews , getCartCoursesData , AddCourseInCart , RemoveCourseInCart , EmptyCart , updateCourseProgress ,  getWatchedDuration , getTotalCourseDuration , getCourseCompletionPercentage} = require("../Controllers/course")
// const {getEnrolledCoursesDataForCardViews} = require("../Controllers/CourseProgres")


const {creatcategory , getAllCategory , categoryPageDetails} = require("../Controllers/Category")
const {createSection , updateSection , deleteSection} = require("../Controllers/Section")
const {createSubSection , updateSubSection , deleteSubSection} = require("../Controllers/Subsection")
const {createRatingAndReviews , getAverageRating , getAllRatingAndReviews} = require("../Controllers/RatingAndReviews")
// middleware
const {auth , isStudent , isInstructor , isAdmin} = require("../Middlewares/auth")






// Course Routes
router.post('/createCourse' , auth , isInstructor ,  createCourse)
router.post('/editCourse' , auth , isInstructor ,  editCourse)
router.get('/showAllCourse' ,  showAllCourse)
router.post('/getAllDetailsOfOneCourse',  getAllDetailsOfOneCourse)
router.post('/publishCourse', auth , isInstructor , publishCourse)
router.post('/getAllCoursesOfInstructor' , auth , isInstructor ,  getAllCoursesOfInstructor)
router.post('/deleteCourseOfInstructor' , auth , isInstructor ,  deleteCourseOfInstructor)
router.post('/getEnrolledCoursesDataForCardViews' , auth , isStudent ,  getEnrolledCoursesDataForCardViews)
router.post('/getCartCoursesData' , auth , isStudent ,  getCartCoursesData)
router.post('/AddCourseInCart' , auth , isStudent ,  AddCourseInCart)
router.post('/RemoveCourseInCart' , auth , isStudent ,  RemoveCourseInCart)
router.post('/EmptyCart' , auth , isStudent ,  EmptyCart)


// courseProgress
router.post('/updateCourseProgress' , auth , isStudent ,  updateCourseProgress)
router.post("/getWatchedDuration", getWatchedDuration);
router.post('/getTotalCourseDuration', getTotalCourseDuration);
router.post('/getCourseCompletionPercentage' , auth , isStudent ,  getCourseCompletionPercentage)






// Category Routes
router.post('/creatcategory' , auth , isAdmin , creatcategory )
router.get('/getAllCategory' ,  getAllCategory)
router.post('/categoryPageDetails' ,  categoryPageDetails)


// Section Routes
router.post('/createSection', auth , isInstructor ,  createSection)
router.post('/updateSection', auth , isInstructor ,  updateSection)
router.post('/deleteSection', auth , isInstructor ,  deleteSection)


// subsection Routes
router.post('/createSubSection', auth , isInstructor , createSubSection)
router.post('/updateSubSection', auth , isInstructor , updateSubSection)
router.post('/deleteSubSection', auth , isInstructor , deleteSubSection)


// Rating And Reviews Route
router.post('/createRatingAndReviews' , auth , isStudent ,  createRatingAndReviews )
router.get('/getAverageRating', getAverageRating)
router.get('/getAllRatingAndReviews' ,  getAllRatingAndReviews)


module.exports = router