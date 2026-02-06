import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { MdOutlineFileUpload } from "react-icons/md";
import { useRef } from "react";
import { useEffect } from "react";
import { updateDisplayPicture } from "../../../../../Services.jsx/Operations/DashBoard";

const UpdateProfilePicture = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth)

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [previewSource, setPreviewSource] = useState(null);
  const [imageFile, setImageFile] = useState(null)


  const InputFileReference = useRef(null);


  const changeHandler = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImageFile(file);
      previewFile(file)
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      // console.log("uploading...")
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      // console.log("formdata", formData)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])

  return (
    <div className=" flex  py-4 rounded-md px-5 w-full bg-richblack-800  gap-x-5 items-center border border-richblack-700">
<div className="relative w-[4rem] h-[4rem]">
  {loading && (
    <div
      className="absolute -left-[3px] -top-[3.5px] inset-0 rounded-full p-[2.2rem] animate-spin"
      style={{
        background: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
      }}
    ></div>
  )}
  <img
    src={previewSource || user?.imageUrl}
    alt={user?.firstName}
    className="w-full h-full rounded-full absolute inset-0"
  />
</div>

      <div className=" flex flex-col gap-y-2" >
        <p className=" text-richblack-5 font-inter ">Change Profile Picture</p>
        <div className=" flex gap-x-2">
          <div>
            <input
              type="file"
              ref={InputFileReference}
              onChange={changeHandler}
              className="hidden"
            />
            <button
              className=" px-2 py-1 bg-richblack-400 rounded-md  "
              onClick={() => InputFileReference.current.click()}
            >
              Select
            </button>
          </div>
          <button 
           onClick={handleFileUpload}
            type="submit"
            className=" flex gap-x-1 bg-yellow-50 py-1 rounded-md px-2">
            <p className=" text-richblack-800 ">Upload</p>
            <MdOutlineFileUpload fill="#161d29" size={23} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
