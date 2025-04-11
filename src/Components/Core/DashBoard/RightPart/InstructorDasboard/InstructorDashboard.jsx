import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInstructorCoursesForDashboardData, getInstructorDashboardData } from '../../../../../Services.jsx/Operations/DashBoard'
import CourseSlider from '../../../Catalog/CourseSlider'
import InstructorProfileChart from './InstructorProfileChart'


const InstructorDashboard = () => {

  const [loading , setloading ] = useState(true)

  const { InstructorDashboardData , InstructorCoursesData , user } = useSelector(state=>state.profile)

  const {token} = useSelector(state=>state.auth)


  const dispatch = useDispatch()

  // console.log("InstructorDashboardData", InstructorDashboardData)
  // console.log("InstructorCoursesData", InstructorCoursesData)
  // console.log("token", token)



  useEffect(()=>{
     const getDashboardData = async()=>{
      try{
        
        await dispatch(getInstructorDashboardData(token))

        await dispatch(getInstructorCoursesForDashboardData(token))


      }catch(error){
         console.log(error)
      }

      setloading(false)

     }
     getDashboardData()
  },[])

  const totalAmount = InstructorDashboardData?.reduce((acc,curr)=> acc + curr.totalAmountEarned , 0);
  const totalStudents = InstructorDashboardData?.reduce((acc,curr)=>acc + curr.totalStudentsEnrolled, 0);

  if(loading){
    return(
      <div className='  text-richblack-5 h-full w-full justify-center items-center'>...Loading</div>
    )
  }
  

  return (
    <div className=' flex flex-col gap-y-10 py-10 px-10'>
       
       <div className=' flex flex-col  gap-y-2'>
        <p className=' text-richblack-5 text-2xl font-semibold '>Hi <span className=' lowercase'>{user.firstName}</span> 👋</p>
        <p  className=' text-richblack-300 '>Let's start something new</p>
       </div>



       <div className=' flex  bg-richblack-700 py-5  justify-evenly items-center   rounded-md'>

        <InstructorProfileChart courses={InstructorDashboardData} />

        <div className=' flex flex-col gap-y-10  bg-white  px-5 py-5   rounded-md'>
           <p className=' text-3xl font-semibold'>Statistics</p>
           <div className=' flex flex-col gap-y-2'>
              <div className=' flex flex-col gap-y-1'>
                <p>Total Courses</p>
                <p className=' text-3xl font-semibold'>{InstructorCoursesData.length}</p>
              </div>
              <div className=' flex flex-col gap-y-1'>
                <p>Total Students</p>
                <p className=' text-3xl font-semibold'>{totalStudents}</p>
              </div>
              <div className=' flex flex-col gap-y-1'>
                <p>Total Income</p>
                <p className=' text-3xl font-semibold'>{totalAmount}</p>
              </div>
           </div>
        </div>
       </div>




        <div className=' py-2'>
        <CourseSlider data={InstructorCoursesData} count={2}/>
        </div>



    </div>
  )
}

export default InstructorDashboard