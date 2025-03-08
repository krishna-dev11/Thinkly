import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SlideBarButton from "./SlideBarButton";
import { sidebarLinks } from "../../../../data/dashboard-links";

const SideBar = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading, user } = useSelector((state) => state.profile
  );
  // console.log(user);

  if (authLoading || profileLoading) {
    return <div className=" text-yellow-50">Loading...</div>;
  }

  return (
    <div className=" w-[15%] bg-richblack-800 flex flex-col gap-y-5">
        <div className=" flex flex-col mt-[2rem]">
           {
            sidebarLinks.map((link , index)=>(
                <Link to={link.path} key={index}>
                    {
                        user.accountType === link.type && ( 
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
  </div>
  )
};

export default SideBar;
