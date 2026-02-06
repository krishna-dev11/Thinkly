import React from 'react'
import { Outlet } from 'react-router-dom'
// import SideBar from '../Components/Core/DashBoard/LeftPart/SideBar'
import EnrolledCoursesSideBar from '../Components/Core/EnrolledCourses/Left/EnrolledCoursesSideBar'

const EnrolledCourses = () => {
  return (
    <div className=' flex w-full h-[calc(100%-6%)] translate-y-10 fixed '>
    <div className='bg-white  transition-all duration-200
     flex flex-col gap-y-5 w-[15%] '>
       <EnrolledCoursesSideBar/>
    </div>
      
      <div className='border-l-richblack-100   border  h-full w-full  overflow-auto  '>
         <Outlet/>
      </div>
      
    </div>
  )
}

export default EnrolledCourses