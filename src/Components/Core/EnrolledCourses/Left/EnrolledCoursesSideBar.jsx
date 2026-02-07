import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BuyedCoursessidebarLinks } from "../../../../data/dashboard-links";
import { Link, useNavigate } from "react-router-dom";
import SlideBarButton from "../../DashBoard/LeftPart/SlideBarButton";
import { FaStore } from "react-icons/fa";



const EnrolledCoursesSideBar = () => {

    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate()

  return (
    <>
      <div className=" flex flex-col h-full place-content-between py-8">

        <div>
        {
          BuyedCoursessidebarLinks.map((links , index)=>(
            <Link to={links.path} key={index}>
                    { 
                            <div className=' '>
                               <SlideBarButton  path={links.path} name={links.name} icon={links.icon} />
                            </div>
                    }
                </Link>
          ))
        }
        </div>

        <div className=" flex flex-col gap-y-3 ">
          
          <div className=" flex gap-x-2 bg-yellow-5 opacity-50 rounded-full  w-[90%] mx-auto  py-1 justify-center items-center">
            <FaStore fill="#553f02"/>
            <p className=" text-yellow-900">Visit Store</p>
          </div>

          <div className=" flex gap-x-2 justify-center items-center  cursor-pointer mx-auto"
             onClick={()=>navigate("/dashboard/my-profile")}>
            <img src={user.imageUrl} className=" w-[2.5rem] rounded-full"/>
            <div className=" flex flex-col  gap-y-1">
              <p className=" font-inter text-richblack-900 uppercase">{user.firstName} {user.lastName}</p>
              <p className=" text-xs  text-richblack-200">{user.accountType}</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default EnrolledCoursesSideBar;
