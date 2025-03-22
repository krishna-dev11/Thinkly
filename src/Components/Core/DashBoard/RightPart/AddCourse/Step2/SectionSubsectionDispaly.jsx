import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiLineHeight } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { IoIosAdd } from "react-icons/io";
import SubSectionCollectDataModel from "./SubSectionCollectDataModel";
import { SetaddSubSection, SeteditSubSection, SetviewSubSection } from "../../../../../../Slices/SubSection";
import { SetEditSection, SetsectionId } from "../../../../../../Slices/Section";
import { DeleteSection } from "../../../../../../Services.jsx/Operations/DashBoard";

const SectionSubsectionDispaly = () => {
  const dispatch = useDispatch();

  const { course } = useSelector((state) => state.Course);
  const {token} = useSelector(state=>state.auth)
  const { addSubSection, editSubSection, viewSubSection } = useSelector(
    (state) => state.subsection
  );

  const { editSection } = useSelector((state) => state.section);

  console.log(addSubSection, editSubSection, viewSubSection)

  const handleAddLecture = (event) => {
    dispatch(SetaddSubSection(event));
    dispatch(SetsectionId(event));
  };

  return (
    <>
      {course?.courseContent?.length > 0 && (
        <div className=" w-full bg-richblack-700 rounded-md flex flex-col py-2 ">
          {course?.courseContent?.map((section) => (
            <details
              key={section._id}
              className=" w-[90%] flex flex-col gap-y-5 mx-auto border-b-[1px] border-richblack-600"
            >
              <summary className="list-none flex flex-col gap-y-1">
                <div className=" flex justify-between px-2 ring-richblack-400">
                  <div className=" flex gap-x-1 justify-center items-center">
                    <CiLineHeight fill="#6e727f" />
                    <p className=" text-richblack-5">{section.sectionName}</p>
                  </div>
                  <div className=" flex gap-x-1 justify-center items-center">
                    <MdEdit
                      fill="#6e727f"
                      onClick={(e) => {
                        e.stopPropagation(); // Preventing the click from triggering <summary> toggle
                        dispatch(SetEditSection(editSection === null ? section : null))
                      }}
                      className=" cursor-pointer z-40"
                    />
                    <RiDeleteBinLine fill="#6e727f" 
                                            onClick={(e) => {
                                                     e.stopPropagation(); 
                                                     const formData = new FormData()
                                                     formData.append("sectionId" , section._id )
                                                     formData.append("courseId" , course._id )
                                                     dispatch(DeleteSection( formData , token ))
                      }}
                      className=" cursor-pointer z-40"
                    />
                    <p className=" text-richblack-400 text-lg font-semibold">
                      |
                    </p>
                    <TiArrowSortedDown fill="#6e727f" />
                  </div>
                </div>
              </summary>


{/* subsection */}
              <div className=" flex flex-col gap-y-1 ml-10">
                {section?.subSections?.map((subsection) => (
                  <div className=" flex justify-between px-2 ring-richblack-400">
                    <div className=" flex gap-x-1 justify-center items-center">
                      <CiLineHeight fill="#6e727f" />
                      <p className=" text-richblack-5 text-sm cursor-pointer" onClick={(e)=>{
                        e.stopPropagation();
                        dispatch(SetviewSubSection(viewSubSection === null ? subsection : null))
                        
                      }}>{subsection.title}</p>
                    </div>
                    <div className=" flex gap-x-1 justify-center items-center">
                    <MdEdit
                      fill="#6e727f"
                      onClick={(e) => {
                        e.stopPropagation(); // Preventing the click from triggering <summary> toggle
                        dispatch(SeteditSubSection(editSubSection === null ? subsection : null))
                      }}/>
                      <RiDeleteBinLine fill="#6e727f" />
                      <p className=" text-richblack-400 text-lg font-semibold">
                        |
                      </p>
                      <TiArrowSortedDown fill="#6e727f" />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => handleAddLecture(section._id)}
                  className=" flex gap-x-1 justify-center items-center "
                >
                  <IoIosAdd fill="#ffd60a" />
                  <p className=" text-yellow-50">Add Lecture</p>
                </button>
              </div>
            </details>
          ))}
        </div>
      )}
      {(addSubSection || editSubSection || viewSubSection) && <SubSectionCollectDataModel />}
    </>
  );
};

export default SectionSubsectionDispaly;
