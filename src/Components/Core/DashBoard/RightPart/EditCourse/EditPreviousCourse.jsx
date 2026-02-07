import React from 'react'
import AddNewCourse from '../AddCourse/AddNewCourse'
import { useSelector } from 'react-redux'

const EditPreviousCourse = () => {

  const {course} = useSelector(state=>state.Course)
  // console.log(course)

  return (
    <div className=' flex flex-col  gap-y-1 py-6 px-3 mx-auto'>
        <p className=' text-richblack-5 font-semibold text-2xl px-6'>Edit Course</p>

    {/* Bcoz mujhe edit karne ke liye full ye code likhna padhta isliye ye hi import kar liya */}
        <AddNewCourse/>
    </div>
  )
}

export default EditPreviousCourse