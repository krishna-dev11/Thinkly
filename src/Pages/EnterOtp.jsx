import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../Services.jsx/Operations/authAPI";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";

const EnterOtp = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const { signUpData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      setCanResend(false);
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const submitHandler = (event) => {
    
    event.preventDefault();

    const {
      FirstName,
      lastName,
      CreatePassword,
      ConfirmPassword,
      EmailAddress,
      accountType,
    } = signUpData;

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
  };

  const handleResend = () => {
    if (!canResend) return;

    // TODO: Add your resend OTP API call here
    // console.log("Resending OTP...");
    dispatch(sendOtp(signUpData.EmailAddress , navigate))

    // Reset timer
    setTimer(60);
  };

  return (
    <div className="h-screen w-full bg-richblack-900 flex justify-center items-center flex-col text-3xl">
      <div className="w-[40%] flex flex-col border-richblack-400 border p-10 rounded-md gap-y-5">
        <form onSubmit={submitHandler} className="flex flex-col gap-y-10">
          <label className="flex flex-col gap-y-7">
            <p className="text-white">Enter OTP</p>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] h-[5rem] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
            />
          </label>

          <button type="submit" className="px-5 py-2 bg-yellow-50 rounded-md">
            Submit
          </button>

          {/* Resend OTP Section */}
          <div className="text-sm text-center text-richblack-300">
            {canResend ? (
              <span
                className="text-yellow-50 underline cursor-pointer"
                onClick={handleResend}
              >
                Resend OTP
              </span>
            ) : (
              <span>Resend OTP in {timer} sec</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterOtp;
