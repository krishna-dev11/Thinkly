import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SlideBarButton from "./SlideBarButton";
import { sidebarLinks } from "../../../../data/dashboard-links";
import { IoIosLogOut } from "react-icons/io";
import ConfirmationModal from "../../../Common/ConfirmationModal";
import { setLogOut } from "../../../../Services.jsx/Operations/authAPI";

const SideBar = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading, user } = useSelector((state) => state.profile
  );
  // console.log(user);

  const [ LogOutButtonData , setLogoutButtonData] = useState(null)
  // console.log(LogOutButtonData)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (authLoading || profileLoading) {
    return <div className=" text-yellow-50">Loading...</div>;
  }

  return (
    <>
      <div className=" w-[15%] bg-richblack-800 flex flex-col gap-y-5">
        <div className=" flex flex-col mt-[2rem]">
           {
            sidebarLinks.map((link , index)=>(
                <Link to={link.path} key={index}>
                    {
                         (user.accountType === link.type || !link.type) && ( 
                            <div className=' '>
                               <SlideBarButton icon={link.icon} path={link.path} name={link.name} />
                            </div>
                        )
                    }
                </Link>
            ))
            
           }
        </div>
        
        <div className=" h-[1px] w-[80%] mx-auto bg-richblack-300"></div>

        <SlideBarButton icon={"IoMdSettings"} path={"/dashboard/setting"} name={"Settings"}/>

         <button className="flex gap-x-2  -translate-y-4 px-3 text-richblack-300  text-base font-inter items-center"
                onClick={()=>setLogoutButtonData({
                  heading : "Are you Sure ? ",
                  text1 : "ou will be logged out of your account.",
                  button1Text : "Logout",
                  button2Text : "Cancel",
                  btn1Onclick : ()=>(dispatch(setLogOut(navigate))),
                  btn2Onclick : ()=>(setLogoutButtonData(null))
                })}>
             <IoIosLogOut />
             <p>Logout</p>
         </button>

  </div>

     { LogOutButtonData && <ConfirmationModal data={LogOutButtonData}/>}
    </>
  )
};

export default SideBar;
