import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Components/Core/DashBoard/LeftPart/SideBar'

const Dashboard = () => {
  return (
    <div className=' flex w-full h-[calc(100%-8%)] bg-richblack-900'>
      <SideBar/>
      <div className=' border-l-richblack-50 border w-[87%] h-full bg-richblack-900 overflow-auto '>
         <Outlet/>
      </div>
      
    </div>
  )
}

export default Dashboard