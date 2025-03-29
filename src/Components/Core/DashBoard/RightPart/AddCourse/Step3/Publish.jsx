import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { COURSE_STATUS } from "../../../../../../Utilities/Constaints";
import { useDispatch, useSelector } from "react-redux";
import { PublishorDraftCourse } from "../../../../../../Services.jsx/Operations/DashBoard";
import { useNavigate } from "react-router-dom";
import { SetEditSection } from "../../../../../../Slices/Section";
import { setStep } from "../../../../../../Slices/Courses";
import {IoIosArrowBack} from "react-icons/io"

const Publish = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.Course);


  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(()=>{
    if(course.status === COURSE_STATUS.PUBLISHED){
      setValue("PublishORDraft" , true)
    }
  },[])

  const submitHandler = (event) => {
    // edit Publish or Draft COurse

    // create New publish or Draft
    const formData = new FormData();
    const status = event.PublishORDraft
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", status);
    formData.append("courseId" , course._id);

    try {
      dispatch(PublishorDraftCourse(formData, token, status, navigate));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-col gap-y-5 ">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className=" w-[95%] bg-richblack-700 rounded-md border border-richblack-700 h-full mx-auto flex flex-col gap-y-4 py-4 px-4"
      >
        <p className=" text-xl text-richblack-5 font-semibold">Publish Settings</p>

        <label className=" flex gap-x-2 items-baseline">
          <input
            type="checkbox"
            {...register("PublishORDraft", {
              required: {
                message:
                  "please Specify the type of Course Publish form either DRAFT or PUBLISH",
              },
            })}
          />
          <p className=" text-richblack-300">Make this Course Public</p>
        </label>

        <button type="submit" className=" flex px-2 py-1 rounded-md bg-yellow-50 self-end">
          Save
        </button>
      </form>

      <button
        className=" flex px-2 py-1 rounded-md bg-richblack-700 self-start  items-center ml-4 justify-center  text-richblack-5"
        onClick={() => {
          dispatch(setStep(2));
        }}
      >
        <IoIosArrowBack />
        <p>Back</p>
      </button>

    </div>
  );
};

export default Publish;
