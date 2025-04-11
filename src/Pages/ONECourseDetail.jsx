import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetWholeCourseDetails } from "../Services.jsx/Operations/CoursesAPI";
import Fotter from "../Components/Common/Fotter";
import { IoInformationCircleOutline, IoGlobeOutline } from "react-icons/io5";
import { FormateDate } from "../Utilities/FormateDate";
import { convertMinutesToHoursAndMinutes } from "../Utilities/FormateTime";
import OverviewofLectures from "../Components/Core/CourseDetails/OverviewofLectures";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Navigation, Keyboard, Autoplay } from "swiper/modules";
import { buyCourse } from "../Services.jsx/Operations/PaymentAPI";
import toast from "react-hot-toast";
import { setCartCoursesIds } from "../Slices/Cart";
import { AddNewCouseInCart } from "../Services.jsx/Operations/CartAPI";
import GetAvgRating from "../Utilities/avgRating";
import RatingStars from "../Components/Common/RatingStars";
import copy from "copy-to-clipboard";
// import "../App.css";
import "../Utilities/Loading.css";
import ReviwSlider from "../Components/Core/Home/ReviwSlider";

const ONECourseDetail = () => {
  const { courseDetails } = useSelector((state) => state.Category);
  // const { cartCoursesIds } = useSelector(state=>state.cart)
  const [loading, setLoading] = useState(true);
  const [totalLectures, setTotalLectures] = useState(0);
  const [totalCourselength, setTotalLecturesDuration] = useState(0);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const { CourseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(courseDetails, "ksadsdsd");
  const [AvrageRatingCount, setAvrageRatingCount] = useState(0);

  const handleBuyCourse = () => {
    if (token) {
      dispatch(
        buyCourse(
          token,
          [CourseId],
          courseDetails.price,
          user,
          navigate,
          dispatch
        )
      );
      return;
    } else {
      toast.error("Login First then Buy Course");
      navigate("/login");
    }
  };

  const handleAddCourseInCart = (newcourseId) => {
    try {
      if (user.courses.some((courseid) => courseid === CourseId)) {
        toast.error("you already Buy These Course");
        return;
      }

      if (user.cart.some((course) => course._id === CourseId)) {
        toast.error("Course already Includes in Cart");
      } else {
        dispatch(AddNewCouseInCart(newcourseId, user._id, token, navigate));
      }
    } catch (error) {
      console.log("error in adding Course to data");
    }
  };

  useEffect(() => {
    const GetWholeCouseDataForDisplay = async () => {
      try {
        await dispatch(GetWholeCourseDetails(CourseId));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    GetWholeCouseDataForDisplay();
  }, [CourseId, dispatch]);

  // average rating
  useEffect(() => {
    const getAverageRating = async () => {
      const avg = await GetAvgRating(courseDetails.ratingAndReviews);
      setAvrageRatingCount(avg);
    };
  });

  useEffect(() => {
    // totallectures
    if (!loading && courseDetails?.courseContent) {
      let lectureCount = 0;
      courseDetails.courseContent.map((section) => {
        lectureCount += section.subSections.length;
      });
      setTotalLectures(lectureCount);
    }

    // totalDuration of COurse
    if (!loading && courseDetails?.courseContent) {
      let Lectureduration = 0;
      courseDetails.courseContent.map((section) => {
        section.subSections.map((subsection) => {
          Lectureduration += parseFloat(subsection.timeDuration);
        });
      });

      const formatedTime = convertMinutesToHoursAndMinutes(Lectureduration);

      setTotalLecturesDuration(formatedTime);
    }
  }, [loading, courseDetails]);

  if (loading || !courseDetails || Object.keys(courseDetails).length === 0) {
    return (
      <div className="flex items-center justify-center h-screen  w-screen bg-richblack-900">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full translate-y-9 text-richblack-5">
      {/* Top Section */}
      <div className="flex relative bg-richblack-800 w-full translate-y-4  gap-x-6  py-16 px-10">
        {/* Left Side */}
        <div className="flex flex-col gap-y-2 w-3/5">
          <p>
            Home / Learning /{" "}
            <span className=" text-yellow-50">{`${courseDetails.courseName}`}</span>
          </p>
          <p className="text-3xl font-semibold">{courseDetails.courseName}</p>
          <p className="text-richblack-300 text-sm">
            {courseDetails.courseDescription}
          </p>
          <div className=" flex gap-x-2  items-center">
            <p className=" text-yellow-50 text-lg">
              {parseFloat(AvrageRatingCount)}
            </p>
            <RatingStars Review_Count={AvrageRatingCount} Star_Size={25} />
            <p>{`(${courseDetails.ratingAndReviews.length} ratings)`}</p>
            <p>{`${courseDetails.studentEnrolled.length} Students`}</p>
          </div>
          <p className=" ">
            Created By :-{" "}
            <span className=" lowercase">{`${courseDetails.instructor.firstName} ${courseDetails.instructor.lastName}`}</span>
          </p>

          <div className="flex gap-x-4 items-center">
            <div className="flex gap-x-1 items-center">
              <IoInformationCircleOutline />
              <p>{`Created at: ${FormateDate(courseDetails.createdAt)}`}</p>
              <p className=" text-caribbeangreen-50">{` | Updated at: ${FormateDate(
                courseDetails.updatedAt
              )}`}</p>
            </div>
            <div className="flex gap-x-1 items-center">
              <IoGlobeOutline />
              <p>English</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className=" flex flex-col max-w-[22rem]  cursor-pointer  bg-richblack-900 absolute right-10  backdrop-blur-lg  border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] mx-auto  gap-y-4  text-richblack-900 rounded-md px-2 py-4   min-h-[24rem] ">
          <img
            src={courseDetails.thumbnail}
            alt="thumbnail"
            className="w-full  h-auto rounded"
          />
          <p className="text-2xl  mt-2 font-semibold text-richblack-5">{`Rs. ${courseDetails.price}`}</p>

          {user.accountType === "Instructor" ? (
            <Link to={"/dashboard/my-courses"} className="w-[90%] flex justify-center items-center mx-auto py-2 bg-yellow-50 text-black  font-semibold rounded">
            Go To My Courses
            </Link>
          ) : (
            <div className=" flex flex-col gap-y-2">
              {user.cart.some((course) => course._id === courseDetails._id) ? (
                <button
                  className="w-[90%] mx-auto py-2 bg-yellow-50 text-black  font-semibold rounded"
                  onClick={() => navigate("/dashboard/wishlist")}
                >
                  Go to cart
                </button>
              ) : user.courses.includes(courseDetails._id) ? (
                <button
                  className="w-[90%] mx-auto py-2 bg-yellow-50 text-black font-semibold rounded"
                  onClick={() => navigate("/EnrolledCourses/active-Courses")}
                >
                  Start Learning
                </button>
              ) : (
                <button
                  className="w-[90%] mx-auto py-2 bg-yellow-50 text-black font-semibold rounded"
                  onClick={() => handleAddCourseInCart(courseDetails._id)}
                >
                  Add to cart
                </button>
              )}

              {!user.courses.includes(courseDetails._id) && (
                <button
                  className=" w-[90%] mx-auto py-2 bg-richblack-800 text-white font-semibold rounded border border-richblack-700"
                  onClick={handleBuyCourse}
                >
                  Buy Now
                </button>
              )}
            </div>
          )}

          <p className="text-sm text-richblack-300 mx-auto ">
            30-Day Money-Back Guarantee
          </p>

          <div className=" flex flex-col gap-y-2 px-5">
            <p className="font-semibold mb-1 text-richblack-5">
              This Course includes:
            </p>
            <ul className="text-[#06D6A0] flex flex-col gap-y-1 text-sm list-disc list-inside">
              {courseDetails.tag.map((tag, i) => (
                <li key={i}>{tag}</li>
              ))}
            </ul>
          </div>
          <p
            className="text-yellow-50 cursor-pointer mx-auto "
            onClick={() => {
              copy(window.location.href);
              toast.success("path Copied");
            }}
          >
            Share
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full bg-richblack-900 px-6 py-8 gap-y-5">
        {/* What You'll Learn */}
        <div className="mt-6  rounded-md   w-[68%] border gap-y-3 flex flex-col border-richblack-700 py-8 px-8">
          <p className="text-3xl font-semibold">What you'll learn</p>
          <ul className="text-richblack-300 text-sm list-disc flex flex-col gap-y-2 list-inside">
            {courseDetails.whatYouWillLearn.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Course Content */}
        <div className="mt-6   rounded-md px-3 py-3 gap-y-1 flex flex-col">
          <p className="text-2xl font-semibold ">Course Content</p>
          <ul className="flex gap-x-5 mt-2 text-richblack-300">
            <li className=" flex  justify-center items-center gap-x-1 ">
              <IoInformationCircleOutline />{" "}
              {`${courseDetails.courseContent.length} Sections`}
            </li>
            <li className=" flex  justify-center items-center gap-x-1 ">
              <IoInformationCircleOutline />
              {`${totalLectures} Lectures`}
            </li>
            <li className=" flex  justify-center items-center gap-x-1 ">
              {" "}
              <IoInformationCircleOutline />{" "}
              {`${totalCourselength} totallength `}
            </li>
          </ul>
          <OverviewofLectures data={courseDetails.courseContent} />
        </div>

        {/* Instructors Overview */}
        <div className=" w-[90%]   flex flex-col gap-y-4 mx-auto">
          <div className=" flex flex-col gap-y-2">
            <p className=" text-[4rem]  font-inter font-semibold">
              Our Instructor
            </p>
            <p className=" text-sm w-[80%] mx-auto text-center ">
              Discover brilliance in code with our expert instructors.
              Passionate mentors dedicated to fueling your coding journey at
              CodeHelp.
            </p>
          </div>

          <div className="bg-[#e33333]/10 backdrop-blur-sm shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]  border border-white/20 rounded-md w-[90%] mx-auto py-10 h-[30rem] ">
            <Swiper
              slidesPerView={1}
              loop={true}
              grabCursor={true}
              direction="horizontal"
              rtl={true}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5500,
                disableOnInteraction: false,
              }}
              modules={[Pagination, Navigation, Keyboard, Autoplay]}
              className="  " // Optional: Swiper container center
            >
              <SwiperSlide className="flex flex-col gap-y-2 px-5  ">
                <div className=" flex flex-col gap-y-1 ">
                  <p className=" uppercase text-3xl font-inter font-semibold   ">{`${courseDetails.instructor.firstName} ${courseDetails.instructor.lastName}`}</p>
                  <p className=" italic ">
                    Founder - Code-Help, Ex-Amazon, Ex-Microsoft
                  </p>
                </div>
                <img
                  src={courseDetails.instructor.imageUrl}
                  alt="Instructor"
                  className="w-10 h-10 rounded-full shadow-md object-cover border border-gray-200 max-w-[10rem] mx-auto max-h-[10rem]"
                />
                <p className="  w-[85%] italic ">
                  {courseDetails.instructor.additionalDetails.about}
                </p>
              </SwiperSlide>

              <SwiperSlide className="flex flex-col gap-y-2 px-5  ">
                <div className=" flex flex-col gap-y-1 ">
                  <p className=" uppercase text-3xl font-inter font-semibold   ">{`${courseDetails.instructor.firstName} ${courseDetails.instructor.lastName}`}</p>
                  <p className=" italic ">
                    Founder - Code-Help, Ex-Amazon, Ex-Microsoft
                  </p>
                </div>
                <img
                  src={courseDetails.instructor.imageUrl}
                  alt="Instructor"
                  className="w-10 h-10 rounded-full shadow-md object-cover border border-gray-200 max-w-[10rem] mx-auto max-h-[10rem]"
                />
                <p className="  w-[85%] italic ">
                  {courseDetails.instructor.additionalDetails.about}
                </p>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        {/* Reviews */}
        {/* section5 slider */}
        <div className=" bg-richblack-900">
          <ReviwSlider />
        </div>
      </div>

      {/* Footer */}
      <Fotter />
    </div>
  );
};

export default ONECourseDetail;
