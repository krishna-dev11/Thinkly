import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetBuyedCoursesDataOfStudentForCard } from "../../../../Services.jsx/Operations/CoursesAPI";
import BuyedCourseCard from "./BuyedCourseCard";

const ActiveCourseList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { userBuyedCoursesDataForCard } = useSelector((state) => state.Course);
  const { user } = useSelector((state) => state.profile);

  const [loading , setloading] = useState(true)


  useEffect(() => {
     const fetchBuyedCourseData = async()=>{
      try {
       await dispatch( GetBuyedCoursesDataOfStudentForCard( user._id , token ));
      } catch (error) {
          console.log(error)
      }
      setloading(false)
     }

     fetchBuyedCourseData()
  }, []);

  if(loading){
    return(
      <div className=" flex h-full w-full justify-center items-center">
      ...Loading
    </div>
    )
  }

  return (
    <div className="  px-6 py-4 flex flex-col min-h-screen gap-y-5 bg-white">
      <div className=" flex flex-col gap-y-2">
        <div className=" flex gap-x-2 items-center">
          <FaArrowLeft />
          <p
            className=" text-pink-200  cursor-pointer hover:text-pink-400"
            onClick={() => navigate("/dashboard/my-profile")}
          >
            Back To DashBoard
          </p>
        </div>
        <p className=" text-3xl  font-semibold italic  font-inter">
          Active Courses
        </p>
      </div>
      {
         userBuyedCoursesDataForCard.courses.length > 0   ? (
              <div className=" flex flex-wrap gap-x-4 gap-y-4">
        {
           userBuyedCoursesDataForCard.courses.map(course=>(
            <BuyedCourseCard key={course._id} data={course }/>
           ))
        }
      </div>
            ) : (<div className=" text-richblack-900  h-full w-full justify-center items-center place-items-center"> Yet Not Enrolled in Any course...</div>)
      }
    </div>
  );
};

export default ActiveCourseList;
