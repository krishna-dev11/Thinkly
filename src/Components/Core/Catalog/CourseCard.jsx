import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GetAvgRating from '../../../Utilities/avgRating'
import RatingStars from '../../Common/RatingStars'


const CourseCard = ({data}) => {

  
  
  const navigate = useNavigate()

  const [ averageRatindAndReviewCount , setaverageRatindAndReviewCount] = useState(0)

  useEffect(()=>{
    const getaverageCount  = async()=>{
      const avg = await GetAvgRating(data.ratingAndReviews)
      setaverageRatindAndReviewCount(avg)
    }

    getaverageCount()
  },[])

  return (
    <div className=' flex flex-col max-w-[24rem]  cursor-pointer  bg-white/10 backdrop-blur-md  border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] mx-auto  gap-y-2  text-richblack-900 rounded-md px-2 py-2  min-h-[24rem]'
           onClick={()=>navigate(`/CourseDetails/${data._id}`)}
      >
       <img src={data.thumbnail} className='  '  />
       <p className=' text-sm self-start text-left text-richblack-5 font-semibold'>{data.courseName}</p>
       <p className=' text-sm self-start text-left  lowercase text-richblack-300 '> Instructor : {data?.instructor?.firstName} {data?.instructor?.lastName}</p>
       <div className=' flex gap-x-2  text-yellow-50'>
          <p>{averageRatindAndReviewCount}</p>
          <RatingStars  Review_Count={averageRatindAndReviewCount} Star_Size={20}/>
          <p className=' text-sm'>Ratings...</p>
       </div>
       <p className=' self-start  text-caribbeangreen-100'>{`Rs. ${data.price}`}</p>
    </div>
  )
}

export default CourseCard