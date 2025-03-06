import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../Services.jsx/Operations/authAPI";
import { useNavigate } from "react-router-dom";
import OtpInput from 'react-otp-input';
import { useState } from "react";


const EnterOtp = () => {
  const [otp, setOtp] = useState("");

  const { signUpData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  console.log(signUpData)

  const submitHandler = (event) => {
    event.preventDefault();

    // console.log(event)

    const {
      FirstName,
      lastName,
      CreatePassword,
      ConfirmPassword,
      EmailAddress,
      accountType,
    } = signUpData;

    // console.log(FormData.otp , "hi")

    dispatch(
      signUp(
        FirstName,
        lastName,
        EmailAddress,
        CreatePassword,
        ConfirmPassword,
        accountType,
        otp,
        navigate
      )
    );
    //   console.log(FormData.otp , "hiii")
  };

  return (
    <div  className="h-screen w-full bg-richblack-900 flex justify-center  items-center flex-col  text-3xl">
      <div className="  w-[40%] flex flex-col border-richblack-400 border p-10 rounded-md gap-y-5">
      <form onSubmit={submitHandler} className=" flex flex-col gap-y-10">
        <label className=" flex  flex-col gap-y-7">
          <p className=" text-white">Enter OTP</p>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) =>  <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] h-[5rem] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />}        
          />
        </label>
        <button type="submit" className=" px-5 py-2 bg-yellow-50 rounded-md">
          submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default EnterOtp;
