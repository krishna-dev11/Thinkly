import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineFileUpload } from "react-icons/md";
import { useRef } from "react";

const UpdateProfilePicture = () => {
  const {user} = useSelector(state=>state.profile)
  const dispatch = useDispatch()


  const navigate = useNavigate()


  const InputFileReference = useRef(null)

  const changeHandler = ()=>{

  }

  return(

      <div className=" flex  py-4 rounded-md px-5 w-full bg-richblack-800  gap-x-3 items-center border border-richblack-700">
           
           <img src={user.imageUrl} className=" w-[4rem] rounded-full "/>
           <div className=" flex flex-col gap-y-2">
              <p className=" text-richblack-5 font-inter ">Change Profile Picture</p>
              <div className=" flex gap-x-2">
                  <div>
                      <input
                          type="file"
                          onChange={changeHandler}
                          className="hidden"
                          ref={InputFileReference}
                      />
                      <button className=" px-2 py-1 bg-richblack-400  "
                        onClick={()=>(InputFileReference.current.click())}>
                          Select
                      </button>
                  </div>
                  <button className=" flex gap-x-1 bg-yellow-50"
                           >
                      <p className=" text-richblack-900">Upload</p>
                      <MdOutlineFileUpload  fill="#000814" size={25}/>
                  </button>
              </div>
           </div>

      </div>

  )
};

export default UpdateProfilePicture;
