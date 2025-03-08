import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import CountryCode from '../../../../../data/countrycode.json'
import { useNavigate } from "react-router-dom";



const UpdateProfile = () => {


    const navigate = useNavigate()


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        FirstName: "",
        LastName: "",
        DateOfBirth: "",
        Gender: "",
        CountryCode:"",
        ContactNumber:"",
        About:""
      });
    }
  }, [reset, isSubmitSuccessful]);

  const SubmitUpdatedProfileDetails = async () => {
    try {
    } catch (error) {}
  };

  return (
    <form  onSubmit={handleSubmit(SubmitUpdatedProfileDetails)}>
       <div className=" flex flex-col py-4 rounded-md px-5 w-full bg-richblack-800  gap-x-3 items-center border border-richblack-700">
       <p>Profile Information</p>
      <div>
        <div className=" flex gap-x-2">
          <label>
            <p>First Name</p>
            <input
              type="text"
              placeholder="Enter First Name"
              {...register("FirstName", {
                required: {
                  value: true,
                  message: "please Inter First Name",
                },
              })}
            />
            {errors.FirstName && <span>{errors.FirstName.message}</span>}
          </label>
          <label>
            <p>Last Name</p>
            <input
              type="text"
              placeholder="Enter Last Name"
              {...register("LastName", {
                required: {
                  value: true,
                  message: "please Inter Last Name",
                },
              })}
            />
            {errors.LastName && <span>{errors.LastName.message}</span>}
          </label>
        </div>

        <div className=" flex gap-x-2">
          <label>
            <p>Date of Birth</p>
            <input
              type="date"
              name="FirstName"
              placeholder="Enter Date of Birth"
              {...register("DateOfBirth", {
                required: {
                  value: true,
                  message: "please Enter DOB",
                },
              })}
            />
            {errors.DateOfBirth && <span>{errors.DateOfBirth.message}</span>}
          </label>
          <label>
            <p className=" text-richblack-5">Gender</p>
            <div className=" flex gap-x-3 bg-richblack-400 px-3 py-1 ">
              <label>
                <p>Male</p>
                <input
                  type="radio"
                  name="Gender"
                  value="Male"
                  {...register("Gender", {
                    required: { value: true },
                  })}
                />
              </label>
              <label>
                <p>Female</p>
                <input
                  type="radio"
                  name="Gender"
                  value="Fema"
                  {...register("Gender", {
                    required: { value: true },
                  })}
                />
              </label>
              <label>
                <p>Other</p>
                <input
                  type="radio"
                  name="Gender"
                  value="Other"
                  {...register("Gender", {
                    required: { value: true },
                  })}
                />
              </label>
            </div>
          </label>
        </div>

        <div className=" flex gap-x-3">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Phone Number<sup className="text-pink-200">*</sup>
            </p>
            <div className=" flex gap-x-3">
              <select
                name="CountryCode"
                {...register("CountryCode", {
                  required: {
                    value: true,
                    message: "Please Provide a country Code",
                  },
                })}
                className=" w-[19%] rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
              >
                {CountryCode.map((Country, index) => (
                  <option key={index}>
                    {Country.code} - {Country.country}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="ContactNumber"
                placeholder="Please Enter Your Contact Number"
                {...register("ContactNumber", {
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
                className=" w-[80%] rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
              />
            </div>
          </label>
          <label>
            <p>About</p>
            <input
              type="text"
              placeholder="Enter First Name"
              {...register("About", {
                required: {
                  value: true,
                  message: "Enter Bio Details",
                },
              })}
            />
            {errors.About && <span>{errors.About.message}</span>}
          </label>
        </div>
        
      </div>
       </div>

       <div className=" flex gap-x-3">
          <button className=" px-3 py-2 rounded-md bg-richblack-400 "
          onClick={()=>{navigate("/dashboard/my-profile")}}>
               Cancel
          </button>
          <button
          type="submit"
           className=" px-3 py-2 rounded-md bg-yellow-50 ">
               Save
          </button>
       </div>
    </form>
  );
};

export default UpdateProfile;
