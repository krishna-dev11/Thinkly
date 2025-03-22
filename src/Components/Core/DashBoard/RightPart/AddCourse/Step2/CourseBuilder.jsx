import React from "react";
import { Form, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AddNewSection, EditSection } from "../../../../../../Services.jsx/Operations/DashBoard";
import SectionSubsectionDispaly from "./SectionSubsectionDispaly";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { SetEditSection } from "../../../../../../Slices/Section";
import { form } from "framer-motion/client";
import { setCourse, setEditCourse, setStep } from "../../../../../../Slices/Courses";

const CourseBuilder = () => {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const dispatch = useDispatch();

  const { course } = useSelector((state) => state.Course);
  const { token } = useSelector((state) => state.auth);
  const { editSection } = useSelector((state) => state.section);
  console.log(editSection)

   if(editSection){
      setValue("sectionName" , editSection.sectionName)
   }else{
      setValue("sectionName" , "")
   }


  const FormSubmitHandler = (event) => {

    // edit Section
    const isFormUpdated = ()=>{
      if(editSection.sectionName !== event.sectionName){
        return true
     }else{
      return false
     }
    }
    
    if(editSection){
      if(isFormUpdated){

        const formData = new FormData()
        formData.append("sectionName", event.sectionName);
        formData.append("sectionId", editSection._id );
        formData.append("CourseId" , course._id)

        try{
          dispatch(EditSection(formData , token))
        }catch(error)
        {
          console.log(error)
        }

      }
    }

// create new Section
  if(!editSection){
    const formData = new FormData();
    formData.append("sectionName", event.sectionName);
    formData.append("courseId", course._id);

    try {
      dispatch(AddNewSection(formData, token));
    } catch (error) {
      console.log(error);
    }
  }
  };

  return (
    <div className=" w-[95%] bg-richblack-800 rounded-md border justify-center items-center border-richblack-700 h-full mx-auto flex flex-col gap-y-8 py-4 ">
      <div className=" w-[95%]  flex flex-col gap-y-4">
        <p className=" font-semibold text-xl text-richblack-5">
          Course Builder
        </p>

        <SectionSubsectionDispaly />

        <form
          onSubmit={handleSubmit(FormSubmitHandler)}
          className=" flex flex-col gap-y-2"
        >
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Add Section<sup className="text-pink-200">*</sup>
            </p>
            <input
              placeholder="Add a section to build your course"
              {...register("sectionName", {
                required: {
                  value: true,
                },
              })}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder-gray-500 text-richblack-5"
            />
          </label>
          { editSection ? (
            <button
              type="submit"
              className=" px-5 py-2 border-yellow-50 border-[2px] self-center items-center rounded-md  flex gap-x-2"
            >
              <IoIosAddCircleOutline fill="#ffd60a" />
              <p className=" text-yellow-50">Edit Section</p>
            </button>
          ) : (
            <button
              type="submit"
              className=" px-5 py-2 border-yellow-50 border-[2px] self-center items-center rounded-md  flex gap-x-2"
            >
              <IoIosAddCircleOutline fill="#ffd60a" />
              <p className=" text-yellow-50">Create Section</p>
            </button>
          )}
        </form>
      </div>

      <div className=" flex gap-x-2">
        <button className=" flex px-2 py-1 rounded-md bg-richblack-700" onClick={()=>
        {
          dispatch(setEditCourse(course))
          dispatch(setStep(1))
        }}>
          <IoIosArrowBack />
          <p>Back</p>
        </button>
        <button className=" flex px-2 py-1 rounded-md bg-yellow-50">
          <p>Next</p>
          <IoIosArrowForward />
        </button>
      </div>

    </div>
  );
};

export default CourseBuilder;
