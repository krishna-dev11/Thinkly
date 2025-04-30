import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StudentClassCards from "./StudentClassCards";

const EnterRoom = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  // console.log(user)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const HandleEnterRoom = (event) => {
    console.log(event.EnterCode);
    navigate(`/EnrolledCourses/${event.EnterCode}`);
  };

  return (
    <div className=" justify-center flex items-center h-full bg-white">


      <div className="  w-[60%] border  border-richblack-700 bg-white rounded-md shadow-lg p-6 flex flex-col justify-between">
        
        <div>
          <h2 className="text-2xl font-bold text-richblack-900 mb-2">
            Live Class
          </h2>
          <p className="text-richblack-600 mb-4">
            Your live class is now active. Click below to join and start
            learning!
          </p>
        </div>

        <form onSubmit={handleSubmit(HandleEnterRoom)} className=" flex flex-col gap-y-3">
        <label>
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            First Room Id<sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            placeholder="Enter Room Id"
            name="EnterCode"
            {...register("EnterCode", {
              required: {
                value: true,
                message: "Please Enter Room Code Here",
              },
            })}
            className="w-full rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
          />
        </label>
        <button
        type="submit"
        className=" bg-blue-500  w-full px-5 py-3 rounded-xl hover:scale-105  duration-150 "
      > Go Live </button>
      </form>
 


      </div>


    </div>
  );
};

export default EnterRoom;
