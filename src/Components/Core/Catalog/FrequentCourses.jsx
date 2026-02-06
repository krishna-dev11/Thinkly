// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import GetAvgRating from '../../../Utilities/avgRating'
// import RatingStars from '../../Common/RatingStars'
// import ReactStars from 'react-stars'

// const FrequentCourses = ({data}) => {

// console.log(data)

//       const navigate = useNavigate()
    
//       const [ averageRatindAndReviewCount , setaverageRatindAndReviewCount] = useState(0)
    
//       useEffect(()=>{
//         const getaverageCount  = async()=>{
//           const avg = await GetAvgRating(data.ratingAndReviews)
//           setaverageRatindAndReviewCount(avg)
//           // console.log(avg)
//         }
    
//         getaverageCount()
//       },[])

//   return (
//     <div className=' flex flex-wrap gap-y-3 '>
//         {
//             data.map(course=>(
//                 <div key={course._id} className=' flex flex-col max-w-[35rem] cursor-pointer  min-w-[35rem]  bg-white/10 backdrop-blur-md  border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] mx-auto   gap-y-2  text-richblack-900 rounded-md px-2 py-2  min-h-[24rem]'
//            onClick={()=>navigate(`/CourseDetails/${course._id}`)}
//       >
//        <img src={course.thumbnail} className=' min-h-[21rem]'  />
//        <p className=' text-sm self-start text-left text-richblack-5 font-semibold'>{course.courseName}</p>
//        <p className=' text-sm self-start text-left  lowercase text-richblack-300 '> Instructor : {course?.instructor?.firstName} {course?.instructor?.lastName}</p>
//        <div className=' flex gap-x-2  items-baseline text-yellow-50'>
//           <p className=' text-xl'>{Number(averageRatindAndReviewCount) || 0}</p>
//           {/* <RatingStars  Review_Count={averageRatindAndReviewCount} Star_Size={20}/> */}
//           <ReactStars
//           count={5}
//           edit={false}
//           value={averageRatindAndReviewCount}
//           size={28}
//           color2={"#ffd700"}
//           className=' translate-y-3'
//         />
//           <p className=' text-sm'>Ratings...</p>
//        </div>
//        <p className=' self-start  text-caribbeangreen-100'>{`Rs. ${data?.price}`}</p>
//     </div>
//             ))
//         }
//     </div>
//   )
// }

// export default FrequentCourses








import React from 'react'
import { useNavigate } from 'react-router-dom'
import GetAvgRating from '../../../Utilities/avgRating'
import ReactStars from 'react-stars'

const FrequentCourses = ({ data = [] }) => {

  console.log("FrequentCourses Data:", data)

  const navigate = useNavigate()

  // 🔹 Agar data empty hai to UI crash na ho
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-richblack-200 mt-5">
        No courses available right now.
      </p>
    )
  }

  return (
    <div className='flex flex-wrap gap-y-3'>
      {
        data.map(course => (

          <div
            key={course._id}
            className='flex flex-col max-w-[35rem] cursor-pointer min-w-[35rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] mx-auto gap-y-2 text-richblack-900 rounded-md px-2 py-2 min-h-[24rem]'
            onClick={() => navigate(`/CourseDetails/${course._id}`)}
          >

            {/* Thumbnail */}
            <img
              src={course.thumbnail}
              alt={course.courseName}
              className='min-h-[21rem] w-full object-cover rounded-md'
            />

            {/* Course Name */}
            <p className='text-sm self-start text-left text-richblack-5 font-semibold'>
              {course.courseName}
            </p>

            {/* Instructor */}
            <p className='text-sm self-start text-left lowercase text-richblack-300'>
              Instructor : {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>

            {/* Ratings */}
            <div className='flex gap-x-2 items-baseline text-yellow-50'>
              <ReactStars
                count={5}
                edit={false}
                value={
                  course.ratingAndReviews?.length
                    ? GetAvgRating(course.ratingAndReviews)
                    : 0
                }
                size={28}
                color2={"#ffd700"}
                className='translate-y-3'
              />
              <p className='text-sm'>Ratings</p>
            </div>

            {/* Price */}
            <p className='self-start text-caribbeangreen-100'>
              Rs. {course?.price}
            </p>

          </div>
        ))
      }
    </div>
  )
}

export default FrequentCourses
