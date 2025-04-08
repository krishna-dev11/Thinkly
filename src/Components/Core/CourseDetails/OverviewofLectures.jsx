import React, { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { IoIosTv } from "react-icons/io"
import { convertMinutesToHoursAndMinutes } from "../../../Utilities/FormateTime";
import { IoMdArrowDropdown } from "react-icons/io";

const OverviewofLectures = ({ data }) => {

    const [toatalSectionduration , settoatalSectionduration] = useState(0);

    const CounttoatalSectionduration = (time)=>{
           const newTime = toatalSectionduration + parseFloat(time)
           settoatalSectionduration(newTime)
    }

  return (
    <div className=" flex flex-col">
      {data.map((section) => (
        <details key={section._id}>

          <summary className="list-none">
            <div className=" flex flex-col gap-x-2 justify-center  items-center">
            <IoMdArrowDropdown />
              <p>{section.sectionName}</p>
            </div>
            <div className=" flex flex-col gap-x-2 justify-center  items-center">
              <p className=" text-yellow-50">{`${section.subSections.length} lectures`}</p>
              <p>
                {
                  
                }
              </p>
            </div>
          </summary>

          <div>
                {
                    section.subSections.map(subSection=>(
                        <div className=" flex gap-x-2 justify-center items-center">
                           <IoIosTv /> 
                            <details>
                                <summary className=" flex gap-x-2 list-none">
                                    <p>{subSection.title}</p>
                                    <IoMdArrowDropdown />
                                </summary>
                                <p>{subSection.description}</p>
                            </details>
                            <p>{convertMinutesToHoursAndMinutes(subSection.timeDuration)}</p>
                        </div>
                    ))
                }
          </div>

        </details>
      ))}
    </div>
  );
};

export default OverviewofLectures;
