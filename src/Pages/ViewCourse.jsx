import React from 'react'
import { Outlet } from 'react-router-dom'
import ViewLectureSideBar from '../Components/Core/ViewCourse/left/ViewLectureSideBar'

const ViewCourse = () => {
  return (
    <div className=' flex w-full h-[calc(100%-6%)] translate-y-10 fixed '>
    <div className='bg-white  transition-all  overflow-auto duration-200
     flex flex-col gap-y-5 w-[35%] '>
       <ViewLectureSideBar/>
    </div>
      
      <div className='border-l-richblack-100   border  h-full w-full  overflow-auto  '>
         <Outlet/>
      </div>
      
    </div>
  )
}



export default ViewCourse