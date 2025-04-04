import React from "react";
import {IoIosAdd} from "react-icons/io"
import RenderMyCourses from "./RenderMyCourses";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCourse, setEditCourse, setStep } from "../../../../../Slices/Courses";

const DisplayMyCourses = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className=" flex flex-col gap-y-2 px-10 mx-auto py-10">

      <div className=" font-inter flex justify-between px-2">   
        <p className=" text-richblack-5 text-2xl font-semibold font-inter">My Course</p>
        <button
        onClick={()=>{
          dispatch(setCourse(null))
          dispatch(setStep(1))
          dispatch(setEditCourse(false))
          navigate("/dashboard/add-course")
        }}
          className=" flex gap-x-1 justify-center items-center  bg-yellow-50 px-2 py-2 rounded-md"
        >
          <IoIosAdd />
          <p className=" ">Add Course</p>
        </button>
      </div>

      <RenderMyCourses/>
      
    </div>
  );
};

export default DisplayMyCourses;
