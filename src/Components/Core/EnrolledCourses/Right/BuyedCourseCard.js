// import React from "react";
// import ProgressBar from "@ramonak/react-progress-bar";
import { PiCertificateFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const BuyedCourseCard = ({ data }) => {


  const navigate = useNavigate()

  return (
    <div className=" flex flex-col max-w-[17rem] min-w-[21rem] justify-center  gap-y-2 px-3 py-3 bg-white rounded-md shadow-lg hover:scale-105 transition-all duration-200">
      <img alt="bought course" src={data.thumbnail} className=" w-[19rem]  mx-auto" 
        onClick={()=>{console.log(data)
                    navigate(`/course/${data._id}/section/${data.courseContent[0]._id}/subSection/${data.courseContent[0].subSections[0]}`)
                     }}
      />
      <div className=" flex flex-col ">
        <p className="  font-semibold self-start place-items-start">{data.courseName}</p>
        <p className=" lowercase text-richblack-200  text-xs">
          {data.instructor.firstName} {data.instructor.lastName}
        </p>
      </div>

      {/* progressBar */}
      {/* <div>
        <ProgressBar
          completed={60}
          className=""
          height="15px"
          labelColor="white"
          labelSize="8px"
        />
      </div> */}

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
