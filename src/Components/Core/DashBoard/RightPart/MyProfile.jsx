import React from "react";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {

  const {user} = useSelector(state=>state.profile)

  const navigate = useNavigate()

  return (
    <div className="  w-full py-10 flex flex-col gap-y-4">
      <div className="  px-4 flex flex-col gap-y-3">
        <p className=" text-richblack-5"> Home / Dashboard / <span className=" text-yellow-50">My-Profile</span></p>
        <p className="text-richblack-5 text-3xl font-semibold">My Profile</p>
      </div>

      <div className=" w-[80%] h-[80%]  mx-auto flex flex-col gap-y-4 mt-4 ">


        <div className=" flex justify-between py-3 rounded-md px-5 w-full bg-richblack-800 items-center border border-richblack-700">
          <div className=" flex gap-x-3 justify-center items-center">
            <img src={user.imageUrl} className=" h-[4rem] w-[4rem] rounded-full"/>
            <div className=" flex flex-col">
              <p className=" text-richblack-5 font-semibold lowercase text-[1.2rem] font-inter ">{user.firstName}  {user.lastName}</p>
              <p className=" text-richblack-400">{user.email}</p>
            </div>
          </div>

          <button className=" bg-yellow-50 px-3 flex items-baseline gap-x-2 py-1 rounded-lg" onClick={()=>(navigate("/dashboard/setting"))}>
             <CiEdit fill="#000814" size={20} className=" translate-y-1"/>
             <p className=" text-richblack-900 font-semibold font-inter">Edit</p>
          </button>
        </div>


        <div className=" flex justify-between py-3 rounded-md px-5 w-full bg-richblack-800 items-center border border-richblack-700">
          <div className=" flex gap-x-3 justify-center  flex-col gap-y-1 w-[80%]">
              <p className=" text-xl font-inter font-semibold text-richblack-5">About</p>
              <div className=" text-richblack-400 text-sm ">
              {
                user.additionalDetails.about ? (<p>{user.additionalDetails.about}</p>) : (<p>"Write Something About Yourself"</p>)  
              }
              </div>     
          </div>

          <button className=" bg-yellow-50 px-3 flex items-baseline gap-x-2 py-1 rounded-lg" onClick={()=>(navigate("/dashboard/setting"))}>
             <CiEdit fill="#000814" size={22} className=" translate-y-1"/>
             <p className=" text-richblack-900  font-semibold font-inter">Edit</p>
          </button>
        </div>

        <div className=" flex justify-between py-4 rounded-md px-7 w-full bg-richblack-800 items-center border border-richblack-700">
          <div className=" flex gap-x-3 justify-center  flex-col gap-y-5 w-[70%]">
              <p className=" text-xl font-inter font-semibold text-richblack-5">Personal Details</p>
              <div className=" flex flex-col gap-y-3 ">
                  <div  className=" flex w-full  justify-between">
                     <div className="flex flex-col">
                       <p className=" text-richblack-400">First Name</p>
                       <p className=" font-semibold text-richblack-5 ">{user.firstName}</p>
                     </div>
                     <div className="flex flex-col">
                       <p className=" text-richblack-400">Last Name</p>
                       <p className=" font-semibold text-richblack-5  lowercase">{user.lastName}</p>
                     </div>
                  </div>

                  <div  className=" flex w-full  justify-between">
                     <div className="flex flex-col">
                       <p className=" text-richblack-400">Email</p>
                       <p className=" font-semibold text-richblack-5 ">{user.email}</p>
                     </div>
                     <div className="flex flex-col">
                       <p className=" text-richblack-400">Phone Number</p>
                       <p className=" font-semibold text-richblack-5 ">{user.additionalDetails.contactNumber}</p>
                     </div>
                  </div>

                  <div  className=" flex w-full  justify-between">
                     <div className="flex flex-col">
                       <p className=" text-richblack-400">Gender</p>
                       <p className=" font-semibold text-richblack-5 ">{user.additionalDetails.gender}</p>
                     </div>
                     <div className="flex flex-col">
                       <p className=" text-richblack-400">Date of Birth</p>
                       <p className=" font-semibold text-richblack-5 ">{user.additionalDetails.dateOfBirth}</p>
                     </div>
                  </div>
              </div>   
          </div>

          <button className=" bg-yellow-50 px-3 flex items-baseline gap-x-2 py-1 rounded-lg" onClick={()=>(navigate("/dashboard/setting"))}>
             <CiEdit fill="#000814" size={22} className=" translate-y-1"/>
             <p className=" text-richblack-900  font-semibold font-inter">Edit</p>
          </button>
        </div>

      </div>
    </div>
  );
};

export default MyProfile;
