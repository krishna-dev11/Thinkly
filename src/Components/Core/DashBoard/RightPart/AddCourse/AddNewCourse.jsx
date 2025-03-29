import React from "react";
import { useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";
import { BsFillLightningChargeFill } from "react-icons/bs";
import CourseInformation from "./Step1/CourseInformation";
import CourseBuilder from "./Step2/CourseBuilder";
import Publish from "./Step3/Publish";

const AddNewCourse = () => {
  const { Step } = useSelector((state) => state.Course);

  const StepDetails = [
    {
      id: 1,
      Step: 1,
      title: "Course Information",
    },
    {
      id: 2,
      Step: 2,
      title: "Course Builder",
    },
    {
      id: 1,
      Step: 3,
      title: "Publish",
    },
  ];

  const GuidlinesData = [
    {
      Description: "Set the Course Price option or make it free.",
    },
    {
      Description: "Standard size for the course thumbnail is 1024x576.",
    },
    {
      Description: "Video section controls the course overview video.",
    },
    {
      Description: "Course Builder is where you create & organize a course.",
    },
    {
      Description:
        "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
    },
    {
      Description:
        "Information from the Additional Data section shows up on the course single page.",
    },
    {
      Description: "Make Announcements to notify any important",
    },
    {
      Description: "Notes to all enrolled students at once.",
    },
  ];

  return (
    <div className=" flex w-full h-full px-5 relative  font-inter">
      <div className=" w-[62%] py-10 flex flex-col gap-y-5">
        <div className="flex items-baseline mx-auto">
          {StepDetails.map((singlestep) => (
            <div key={singlestep._id} className="flex items-baseline mx-auto">
              <div
                className={` h-[3.5rem] w-[3.5rem] flex justify-center rounded-full text-xl font-inter font-semibold items-center ${
                  Step === singlestep.Step
                    ? " text-yellow-50 bg-yellow-800 opacity-60 border-[2px]  border-yellow-50"
                    : " bg-richblack-700 text-richblack-300 border-richblack-500 border"
                }`}
              >
                {Step > singlestep.Step ? (
                  <TiTick fill="#ffd60a" size={25} />
                ) : (
                  singlestep.Step
                )}
              </div>
              <div className="">
                {singlestep.Step !== 3 && (
                  <div className={`font-semibold text-2xl ${ Step > singlestep.Step ? "text-yellow-50 " : " text-richblack-300"}`}>
                  --------------------
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div>
          {
            Step === 1 ? <CourseInformation/> : Step === 2 ? <CourseBuilder/> : <Publish/>
          }
        </div>
      </div>

      <div className=" w-[33%] h-full fixed right-3 top-[9.5rem]">
        <div className=" bg-richblack-800 px-4 py-4 rounded-md border w-[90%] flex flex-col gap-y-4 mx-auto ">
          <div className=" flex gap-x-2">
            <BsFillLightningChargeFill fill="#ffd60a" />
            <p className=" text-xl font-inter font-semibold text-richblack-5">
              Course Upload Tips
            </p>
          </div>
          <ul className=" flex flex-col gap-y-1">
            {GuidlinesData.map((line, index) => (
              <li key={index} className=" text-richblack-5 text-sm ">
                {line.Description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddNewCourse;
