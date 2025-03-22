import React from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import Upload from "../Step1/Upload";
import { useDispatch, useSelector } from "react-redux";
import { SetaddSubSection, SeteditSubSection, SetviewSubSection } from "../../../../../../Slices/SubSection";
import { AddNewSubSection } from "../../../../../../Services.jsx/Operations/DashBoard";

const SubSectionCollectDataModel = () => {
  const dispatch = useDispatch();

  const { addSubSection, editSubSection, viewSubSection } = useSelector(
    (state) => state.subsection
  );
  const { sectionId } = useSelector((state) => state.section);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.Course);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setValue,
    getValues,
  } = useForm();

  if(viewSubSection){
    setValue("lectureVideo" , viewSubSection.videoUrl)
    setValue("subSectionName" , viewSubSection.title)
    setValue("description" , viewSubSection.description)
  }else if(editSubSection){
    setValue("lectureVideo" , editSubSection.videoUrl)
    setValue("subSectionName" , editSubSection.title)
    setValue("description" , editSubSection.description)
  }

  const FormSubmitHandler = (event) => {

    const isSubSectionFormUpdated = ()=>{
      if(editSubSection.subSectionName !== event.subSectionName){
        return true
     }else{
      return false
     }
    }

    if(editSubSection){
      if(isSubSectionFormUpdated){
        const formData = new FormData()
        formData.append("SubSectionId", sectionId);
        formData.append("CourseId", course._id);
        formData.append("subSectionName", event.subSectionName);
        formData.append("description", event.description);
        formData.append("timeDuration", undefined);
        formData.append("lectureVideo", event.subSectionLectureVideo);
      }
    }


    if(addSubSection){
      const formData = new FormData();
      formData.append("lectureVideo", event.subSectionLectureVideo);
      formData.append("subSectionName", event.subSectionName);
      formData.append("description", event.description);
      formData.append("sectionId", sectionId);
      formData.append("CourseId", course._id);
      formData.append("timeDuration", undefined);
  
      try {
        dispatch(AddNewSubSection(formData, token));
      } catch (error) {
        console.log(error);
      }
    }

  };

  return (
    <div className="fixed inset-0 z-[1000] grid justify-center items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className=" flex flex-col rounded-md">
        <div className=" flex justify-between px-3 bg-richblack-700">
          <p className=" text-richblack-5">
            {addSubSection
              ? "Add Lecture"
              : editSubSection
              ? " Editing Lecture "
              : " View Lecture"}
          </p>
          <RxCross1
            fill="#f1f2ff"
            onClick={() => ( addSubSection && dispatch(SetaddSubSection(null)) ,
                               editSubSection && dispatch(SeteditSubSection(null)),
                               viewSubSection && dispatch(SetviewSubSection(null)))}
            
          />
        </div>

        <form
          className=" flex flex-col bg-richblack-800"
          onSubmit={handleSubmit(FormSubmitHandler)}
        >
          <Upload
            name="subSectionLectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            getValues={getValues}
            errors={errors}
            video={true}
          />

          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Lecture Title<sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              placeholder="Enter Lecture Title"
              {...register("subSectionName", {
                required: {
                  value: true,
                  message: "Please Provide Lecture Title",
                },
              })}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5"
            />
          </label>

          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Lecture Description<sup className="text-pink-200">*</sup>
            </p>
            <textarea
              placeholder="Enter Lecture Title"
              {...register("description", {
                required: {
                  value: true,
                  message: "Please Provide Lecture description",
                },
              })}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5"
            />
          </label>

          <div className=" flex gap-x-2">
            <button
              className=" px-3 py-2 bg-richblack-700 rounded-md"
              type="submit"
              onClick={() => ( addSubSection && dispatch(SetaddSubSection(false)) ,
                               editSubSection && dispatch(SeteditSubSection(false)),
                               viewSubSection && dispatch(SetviewSubSection(false)))}
            >
              Cancel
            </button>

            {editSubSection && (
              <button
                className=" px-3 py-2 bg-yellow-50 rounded-md"
                type="submit"
              >
                Save Edits
              </button>
            )}
            {addSubSection && (
              <button
                className=" px-3 py-2 bg-yellow-50 rounded-md"
                type="submit"
              >
                Add Lectures
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubSectionCollectDataModel;
