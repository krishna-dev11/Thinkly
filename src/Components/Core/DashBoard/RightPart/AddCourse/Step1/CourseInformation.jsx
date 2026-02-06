import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaRupeeSign } from "react-icons/fa";
// import { apiConnector } from "../../../../../../Services.jsx/apiConnector";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { CreateNewCourse, EditCourse, GetAllCategories } from "../../../../../../Services.jsx/Operations/DashBoard";
import CustomTagInput from "./CustomTagInput";
import CustomInstructionsInput from "./CustomInstructionsInput";
import Upload from "./Upload";
import { COURSE_STATUS } from "../../../../../../Utilities/Constaints";
import CourseBenifitsInput from "./CourseBenifitsInput";

const CourseInformation = () => {

    const dispatch = useDispatch()
    // const navigate = useNavigate()

    const {token} = useSelector(state=>state.auth)
    const {category} = useSelector(state=>state.Category)
    const {editCourse , course} = useSelector(state=>state.Course)
    // console.log(course)


  const {
    register,
    // reset,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(()=>{
     const getAllCategories = async()=>{
         try{
            dispatch(GetAllCategories(token))
         }catch(error){
            console.log(error)
         }
     }

     if(editCourse){
      setValue("CourseTitle" , course.courseName)
      setValue("CourseDescription" , course.courseDescription )
      setValue("CoursePrice" , course.price)
      setValue("CourseCategory" , course.category)
      setValue("CourseTag" , course.tag)
      setValue("CourseBenefits" , course.whatYouWillLearn)
      setValue("CourseRequirments" ,  course.instructions )
      setValue("courseImage" , course.thumbnail)
     }

     getAllCategories()


  },[])

  const isFormUpdated = ()=>{
    const currentValues = getValues()
    if(currentValues.CourseTitle !== course.courseName    ||
       currentValues.CourseDescription !== course.courseDescription ||
       currentValues.CoursePrice !== course.price ||
       currentValues.CourseCategory._id !== course.category._id    ||
       currentValues.CourseTag  !== course.tag     ||
       currentValues.CourseBenefits !== course.whatYouWillLearn     ||
       currentValues.CourseRequirments  !== course.instructions     ||
       currentValues.CourseThumnail  !== course.thumbnailImage   
    ){
      return true
    }
    return false
  }


  const submitHandler = async(event)=>{

    // console.log(event , "event")

    // edit Course
    if(editCourse){
      if(isFormUpdated()){
        const formData = new FormData()
        formData.append("courseId" , course._id)
        formData.append("courseName" , event.CourseTitle)
        formData.append("courseDescription" , event.CourseDescription)
        formData.append("price" , event.CoursePrice)
        formData.append("category" , event.CourseCategory)
        formData.append("tag" , JSON.stringify(event.CourseTag))
        // formData.append("whatYouWillLearn" , event.CourseBenefits)
        formData.append("whatYouWillLearn" , JSON.stringify(event.CourseBenefits))

        formData.append("instructions" , JSON.stringify(event.CourseRequirments))
        formData.append("thumbnailImage" , event.courseImage)
        formData.append("status" , course.status)

        try{
           dispatch(EditCourse(formData , token))
        }catch(error){
           console.log("unable to send FormData data")
        }

        return
        
      }
    }

    // console.log(event , "event")

// create new Course
     const formData = new FormData()
     formData.append("courseName" , event.CourseTitle)
     formData.append("courseDescription" , event.CourseDescription)
     formData.append("price" , event.CoursePrice)
     formData.append("category" , event.CourseCategory)
     formData.append("tag" , JSON.stringify(event.CourseTag))
     formData.append("whatYouWillLearn" , JSON.stringify(event.CourseBenefits))
    //  formData.append("whatYouWillLearn" , event.CourseBenefits)
     formData.append("instructions" , JSON.stringify(event.CourseRequirments))
     formData.append("thumbnailImage" , event.courseImage)
     formData.append("status" , COURSE_STATUS.DRAFT)

     try{
       dispatch(CreateNewCourse(formData , token))
     }catch(error){
       console.log("unable to send FormData data")
     }

  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className=" w-[95%] bg-richblack-800 rounded-md border border-richblack-700 h-full mx-auto flex flex-col gap-y-4 py-5">

      <label className=" w-[93%] mx-auto">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 ">
          Couser Title<sup className="text-pink-200">*</sup>
        </p>
        <input
          type="text"
          placeholder="Enter Course Title"
          {...register("CourseTitle" , {
            required:{
                value:true,
                message:"Please provide course title carefully"
            }
          })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder-gray-500 placeholder:translate-x-5 text-richblack-5"
        />
      </label>

      <label className=" w-[93%] mx-auto">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
        Course Short Description<sup className="text-pink-200">*</sup>
        </p>
        <textarea
          placeholder="Enter Description"
          {...register("CourseDescription" , {
            required:{
                value:true,
                message:"Please provide course Description carefully"
            }
          })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder-gray-500 text-richblack-5"
        />
      </label>

      <label className=" w-[93%] mx-auto relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 ">
        Price<sup className="text-pink-200">*</sup>
        </p>
        <input
          type="text"
          placeholder="Enter Price"
          {...register("CoursePrice" , {
            required:{
                value:true,
                message:"Please provide course Price carefully"
            }
          })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder:px-8 placeholder-gray-500 text-richblack-5"
        />
        <div className=" absolute p-1 rounded-full border flex justify-center items-center top-9 left-2 border-richblack-400">
        <FaRupeeSign fill="#6e727f"/>
        </div>
      </label>

      <label className=" relative w-[93%] mx-auto">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 ">
        Category<sup className="text-pink-200">*</sup>
        </p>
        <select
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder:px-8 placeholder-gray-500 text-richblack-5"
          {...register("CourseCategory" , {
            required:{
                value:true,
                message:"Please Specify the Category "
            }
          })}
          >
            <option disabled>Choose a Category</option>
            {
              category.map(cat=>(
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))
            }
        </select>
      </label>

      <div className=" w-[93%] mx-auto ">
      <CustomTagInput 
             name="CourseTag"
             lable="Tags"
             Placeholder="Enter Tag and Press Enter"
             register={register}
             errors={errors}
             setValue = {setValue}
             getValues = {getValues} 
             />
      </div>



      <div className=" w-[93%] mx-auto ">
      <CourseBenifitsInput
             name="CourseBenefits"
             lable="Benefits of the course"
             Placeholder="Enter Benefits of the course"
             register={register}
             errors={errors}
             setValue = {setValue}
             getValues = {getValues} 
             />
      </div>

      {/* <label className=" w-[93%] mx-auto">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
        Benefits of the course<sup className="text-pink-200">*</sup>
        </p>
        <textarea
          placeholder="Enter Benefits of the course"
          {...register("CourseBenefits" , {
            required:{
                value:true,
                message:"Please provide course Benefits carefully"
            }
          })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder-gray-500 text-richblack-5"
        />
      </label> */}

    <div className="w-[93%]  mx-auto">
    <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        // editData={editCourse ? course?.thumbnail : null}
      />
    </div>

    <div className=" w-[93%] mx-auto ">
    <CustomInstructionsInput
             name="CourseRequirments"
             label="Requirements/Instructions"
             Placeholder="Add Requirments"
             register={register}
             errors={errors}
             setValue = {setValue}
             getValues = {getValues} />
    </div>

      <button type="submit" className=" px-4 py-2 rounded-md bg-yellow-50 self-end mr-5 ">{editCourse ? "Save Edits" : "Next"}</button>

    </form>
  );
};

export default CourseInformation;
