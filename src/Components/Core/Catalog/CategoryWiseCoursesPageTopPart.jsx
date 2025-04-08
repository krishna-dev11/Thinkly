import React from 'react'
import { useSelector } from 'react-redux'
import CourseSlider from './CourseSlider'

const CategoryWiseCoursesPageTopPart = () => {

    const {CategoryWiseCourses} = useSelector(state=>state.Category)
    console.log(CategoryWiseCourses.selectedCategory.course)

  return (
    <div className=''>
        {/* specifications part */}
        <div className=' bg-richblack-700  flex '>
            <div className=' flex flex-col gap-x-1'>
              <p>{`Home / Catalog / ${CategoryWiseCourses.selectedCategory.name.split(" ").join("-")}`}</p>
              <p>{CategoryWiseCourses.selectedCategory.name.split(" ").join("-")}</p>
              <p>{CategoryWiseCourses.selectedCategory.description}</p>
            </div>
            <div>
                <p>Related resources</p>
                <ul>
                    <li>{`Doc ${CategoryWiseCourses.selectedCategory.name.split(" ").join("-")}`}</li>
                    <li>Cheatsheets</li>
                    <li>Articles</li>
                    <li>Community Forums</li>
                    <li>Projects</li>
                </ul>
            </div>
        </div>

        {/* Courses Part */}
        <div className=' bg-richblack-900 flex flex-col gap-y-2'>
           

            {/* Selected Courses */}

            <div className=' text-richblack-5'>
              <p>Courses to get you started</p>
              <CourseSlider data={CategoryWiseCourses.selectedCategory.course} />
            </div>

            {/* RadomCourses */}
            <div className=' text-richblack-5'>
              <p>Top courses in Python and Machine Learning</p>
              <CourseSlider data={CategoryWiseCourses.TopSellingCourses} />
            </div>

            {/* Top 10 Course */}
            <div className=' text-richblack-5'>
              <p>Frequently Bought Together</p>
              <CourseSlider data={CategoryWiseCourses.RandomCategory.course} />
            </div>

        </div>
    </div>
  )
}

export default CategoryWiseCoursesPageTopPart