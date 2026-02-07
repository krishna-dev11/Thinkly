import React, { useState } from "react";
import RatingStars from "../../../Common/RatingStars";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { render } from 'react-dom'
import { CreateRating } from "../../../../Services.jsx/Operations/CoursesAPI";

const ReviewModal = ({ data }) => {
  // console.log(data);

  const { user } = useSelector((state) => state.profile);
  const [ starcount , setStarCount ] = useState(0)
  const { register, reset, setValue, getValues, handleSubmit } = useForm();
  const { courseDetails } = useSelector((state) => state.Category);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  const reviewHandler = async(event) => {
    // console.log(event.Review , starcount);

    try{
     await dispatch(CreateRating(courseDetails._id ,  starcount , event.Review , token))
     data.btn1Onclick()
    }catch(error){
      console.log(error)
    }

  };


  const ratingChanged = (newRating) => {
    // console.log(newRating)
    setStarCount(newRating)
  }

  return (
    <div className="fixed inset-0 z-[1000] grid justify-center items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className=" w-[30rem] border border-richblack-700  rounded-md">
        <div className=" w-full h-[2rem]  rounded-t-md bg-[#1b57fdf3] px-3 flex items-center font-semibold text-richblack-5 ">
          Add Review{" "}
        </div>
        <div className=" bg-[#000000]  py-6 rounded-b-md  justify-center  flex flex-col items-center gap-y-4">
          <img src={user.imageUrl} className=" w-[3rem] rounded-full" />
          <p className=" text-richblack-5 uppercase">
            {user.firstName} {user.lastName}
          </p>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={40}
            color2={"#ffd700"}
          />

          <form
            onSubmit={handleSubmit(reviewHandler)}
            className=" flex flex-col "
          >
            <label className="">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Add Your Experience<sup className="text-pink-200">*</sup>
              </p>
              <textarea
                placeholder="Add Your Review here ..."
                name="FirstName"
                {...register("Review", {
                  required: {
                    value: true,
                    message: "Please Enter Your First Name",
                  },
                })}
                className="w-[25rem]  h-[8rem] rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
              />
              {/* {errors.FirstName && <div>{errors.FirstName.message}</div>} */}
            </label>

            <div className="flex mx-auto mt-3  gap-x-5">
            <button className=" px-3 py-2 self bg-yellow-50 rounded-md text-white"
            onClick={data.btn1Onclick}>
              {data.button1Text}
            </button>

            <button className=" px-3 py-2 sel bg-[#1b57fdf3] rounded-md text-white">
              {data.button2Text}
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
