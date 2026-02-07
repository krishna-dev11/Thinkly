import React from 'react'
import { useSelector } from 'react-redux'
import CourseSlider from './CourseSlider'
import { FaArrowRight, FaCircle, FaDotCircle } from 'react-icons/fa'
import FrequentCourses from './FrequentCourses'

const CategoryWiseCoursesPageTopPart = () => {

    const {CategoryWiseCourses} = useSelector(state=>state.Category)
    // console.log(CategoryWiseCourses)

  return (
    <div className=''>
        {/* specifications part */}
        <div className=' bg-richblack-800  flex mt-6 justify-evenly py-10'>

            <div className=' flex flex-col gap-x-1 text-white w-[70%] gap-y-2'>
              <p>Home / Catalog / <span className=' text-yellow-50'>{`${CategoryWiseCourses.selectedCategory.name.split(" ").join("-")}`}</span></p>
              <p className=' text-3xl  font-inter font-semibold'>{CategoryWiseCourses.selectedCategory.name.split(" ").join("-")}</p>
              <p className=' text-richblack-300 '>{CategoryWiseCourses.selectedCategory.description}</p>
            </div>
            <div className=' flex flex-col gap-y-2'>
                <p className=' font-semibold text-lg text-richblack-5 '>Related resources</p>
                <ul className=' text-sm text-richblack-300   flex flex-col gap-y-1 justify-start  items-start'>
                    <li className=' flex justify-center items-center gap-x-2 cursor-pointer'>
                    <FaCircle size={5} className=' text-caribbeangreen-100'/>
                    {`Doc ${CategoryWiseCourses.selectedCategory.name.split(" ").join("-")}`}</li>
                    <li className=' flex justify-center items-center gap-x-2 cursor-pointer'> <FaCircle size={5} className=' text-caribbeangreen-100'/>Cheatsheets</li>
                    <li className='  place-items-start flex justify-center items-center gap-x-2 cursor-pointer'><FaCircle size={5} className=' text-caribbeangreen-100'/>Articles</li>
                    <li className=' flex justify-center items-center gap-x-2 cursor-pointer'><FaCircle size={5} className=' text-caribbeangreen-100'/>Community Forums</li>
                    <li className=' flex justify-center items-center gap-x-2 cursor-pointer'><FaCircle size={5} className=' text-caribbeangreen-100'/>Projects</li>
                </ul>
            </div>
        </div>

        {/* Courses Part */}
        <div className=' bg-richblack-900 flex flex-col '>
           

            {/* Selected Courses */}

            <div className=' text-richblack-5 py-10 px-10 flex flex-col gap-y-3'>
              <p className=' text-richblack-5 text-3xl font-semibold'>Courses to get you started</p>
              <CourseSlider data={CategoryWiseCourses.selectedCategory.course} />
            </div>

            {/* RadomCourses */}
            <div className=' text-richblack-5 py-10 px-10 flex flex-col gap-y-3'>
              <p className=' text-richblack-5 text-3xl font-semibold'>Top courses Relevant in Near Future</p>
              <CourseSlider data={CategoryWiseCourses.TopSellingCourses} speed={2000}/>
            </div>

            {/* Top 10 Course */}
            <div className=' text-richblack-5 py-10 px-10 flex flex-col gap-y-3'>
              <p className=' text-richblack-5 text-3xl font-semibold'>Frequently Bought Together</p>
              <FrequentCourses data={CategoryWiseCourses.RandomCategory.course}/> 
            </div>

        </div>
    </div>
  )
}

export default CategoryWiseCoursesPageTopPart