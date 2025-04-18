import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../../../../data/countrycode.json";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProfileDetails } from "../../../../../Services.jsx/Operations/DashBoard";
import CustomRadioButton from "./CustomRadioButton";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);


  const {
    register,
    handleSubmit,
    reset,
    setValue, getValues ,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        FirstName: "",
        LastName: "",
        dateOfBirth: "",
        gender: "",
        // Countrycode:"",
        contactNumber: "",
        about: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  const SubmitUpdatedProfileDetails = async (event) => {
    try {
      // console.log(token)
      dispatch(UpdateProfileDetails(token, event));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(SubmitUpdatedProfileDetails)}
      className=" flex flex-col gap-y-5 items-end"
    >
      <div className=" flex flex-col py-4 rounded-md px-5 w-full bg-richblack-800  gap-x-3  border border-richblack-700">
        <p className=" text-richblack-5 text-lg font-inter font-semibold">
          Profile Information
        </p>

        <div className=" flex flex-col gap-y-5 w-full">
          <div className=" flex justify-between">
            <label className=" w-[48%]">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                First Name<sup className="text-pink-200">*</sup>
              </p>
              <input
                type="text"
                placeholder="Enter First Name"
                {...register("FirstName", {
                  required: {
                    value: true,
                    message: "please Inter First Name",
                  },
                })}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder-gray-500 text-richblack-5"
              />
              {errors.FirstName && <span>{errors.FirstName.message}</span>}
            </label>
            
            <label className=" w-[48%]">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Last Name<sup className="text-pink-200">*</sup>
              </p>
              <input
                type="text"
                placeholder="Enter Last Name"
                {...register("LastName", {
                  required: {
                    value: true,
                    message: "please Inter Last Name",
                  },
                })}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder-gray-500 text-richblack-5"
              />
              {errors.LastName && <span>{errors.LastName.message}</span>}
            </label>
          </div>

          <div className=" flex  justify-between">
            <label className=" w-[48%]">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Date of Birth<sup className="text-pink-200">*</sup>
              </p>
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Enter Date Of Birth "
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "please Enter DOB",
                  },
                })}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder-gray-500 text-richblack-5"
              />
              {errors.dateOfBirth && <span>{errors.dateOfBirth.message}</span>}
            </label>

            <label className=" w-[48%]">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Gender<sup className="text-pink-200">*</sup>
              </p>
              <div className=" flex gap-x-3 bg-richblack-700 rounded-md px-3 py-4 ">
                <CustomRadioButton
                  name="gender"
                  lable="Gender"
                  Placeholder="Please Enter Your Gender "
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  getValues={getValues}
                />
              </div>
            </label>
          </div>

          <div className=" flex justify-between">
            <label className=" w-[48%]">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Phone Number<sup className="text-pink-200">*</sup>
              </p>
              <div className=" flex gap-x-3">
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Please Enter Your Contact Number "
                  {...register("contactNumber", {
                    required: {
                      value: true,
                      message: "Please Enter Your Phone Number",
                    },
                    maxLength: {
                      value: 10,
                      message: "Contact Numbe of 10 Digits",
                    },
                    minLength: {
                      value: 10,
                      message: "Contact Numbe of 10 Digits",
                    },
                  })}
                  className=" w-full rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder-gray-500 text-richblack-5"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
                {errors.contactNumber && (
                  <span>{errors.contactNumber.message}</span>
                )}
              </div>
            </label>
            <label className=" w-[48%]">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                About<sup className="text-pink-200">*</sup>
              </p>
              <textarea
                type="text"
                name="about"
                placeholder="Enter Your About in Second Person Voice"
                {...register("about", {
                  required: {
                    value: true,
                    message: "Enter Bio Details",
                  },
                })}
                className=" w-full rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder-gray-500 text-richblack-5"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
              />
              {errors.about && <span>{errors.about.message}</span>}
            </label>
          </div>
        </div>
      </div>

      <div className=" flex gap-x-3">
        <button
          className=" px-3 py-2 rounded-md bg-richblack-400 "
          onClick={() => {
            navigate("/dashboard/my-profile");
          }}
        >
          Cancel
        </button>
        <button type="submit" className=" px-3 py-2 rounded-md bg-yellow-50 ">
          Save
        </button>
      </div>
    </form>
  );
};

export default UpdateProfile;
