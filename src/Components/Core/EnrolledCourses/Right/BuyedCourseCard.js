import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { PiCertificate, PiCertificateFill } from "react-icons/pi";

const BuyedCourseCard = ({ data }) => {
  return (
    <div className=" flex flex-col gap-y-2 px-3 py-3 bg-white rounded-md shadow-lg hover:scale-105 transition-all duration-200">
      <img src={data.thumbnail} className=" w-[15rem]" />
      <div className=" flex flex-col ">
        <p>{data.courseName}</p>
        <p className=" lowercase text-richblack-200  text-xs">
          {data.instructor.firstName} {data.instructor.lastName}
        </p>
      </div>

      {/* progressBar */}
      <div>
        <ProgressBar
          completed={60}
          className=""
          height="15px"
          labelColor="white"
          labelSize="8px"
        />
      </div>

      <div className=" flex justify-between items-center">
        <p className=" text-richblack-200">
          Valid Till: <span className=" text-caribbeangreen-500">Lifetime</span>
        </p>
        <PiCertificateFill  size={25}/>
      </div>
    </div>
  );
};

export default BuyedCourseCard;
