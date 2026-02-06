// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import GetAvgRating from '../../../Utilities/avgRating'
// // import RatingStars from '../../Common/RatingStars'
// import toast from 'react-hot-toast'
// import { useSelector } from 'react-redux'
// import ReactStars from "react-stars";


// const CourseCard = ({data}) => {

//   // console.log(data)

//   const { token } = useSelector((state) => state.auth);
  
//   const navigate = useNavigate()

//   const [ averageRatindAndReviewCount , setaverageRatindAndReviewCount] = useState(0)

//   useEffect(()=>{
//     const getaverageCount  = async()=>{
//       const avg = await GetAvgRating(data.ratingAndReviews)
//       setaverageRatindAndReviewCount(avg)
//     }

//     getaverageCount()
//   },[])

//   return (
//     <div className=' flex flex-col max-w-[24rem]  cursor-pointer  bg-white/10 backdrop-blur-md  border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] mx-auto  gap-y-2  text-richblack-900 rounded-md px-2 py-2  min-h-[24rem]'
//            onClick={()=> token ? navigate(`/CourseDetails/${data._id}`) : toast.error("Login First") }
//       >
//        <img src={data.thumbnail} className=' max-h-[13rem] min-h-[13rem]'  />
//        <p className=' text-sm self-start text-left text-richblack-5 font-semibold'>{data.courseName}</p>
//        <p className=' text-sm self-start text-left  lowercase text-richblack-300 '> Instructor : {data?.instructor?.firstName} {data?.instructor?.lastName}</p>
//        <div className=' flex gap-x-3 items-baseline text-yellow-50'>
//           <p>{Number(averageRatindAndReviewCount) || 0}</p>
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
//        <p className=' self-start  text-caribbeangreen-100'>{`Rs. ${data.price}`}</p>
//     </div>
//   )
// }

// export default CourseCard





import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GetAvgRating from '../../../Utilities/avgRating'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import ReactStars from "react-stars"

const CourseCard = ({ data }) => {

  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [averageRatingAndReviewCount, setAverageRatingAndReviewCount] = useState(0)

  useEffect(() => {
    const getAverageCount = async () => {
      if (data?.ratingAndReviews) {
        const avg = await GetAvgRating(data.ratingAndReviews)
        setAverageRatingAndReviewCount(avg || 0)
      }
    }

    getAverageCount()
  }, [data.ratingAndReviews])

  const handleClick = () => {
    if (!token) {
      toast.error("Login First")
      return
    }
    navigate(`/CourseDetails/${data._id}`)
  }

  return (
    <div
      className='flex flex-col max-w-[24rem] cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] mx-auto gap-y-2 text-richblack-900 rounded-md px-2 py-2 min-h-[24rem]'
      onClick={handleClick}
    >

      <img
        src={data.thumbnail}
        alt={data.courseName || "course thumbnail"}
        className='max-h-[13rem] min-h-[13rem] object-cover w-full rounded-md'
      />

      <p className='text-sm self-start text-left text-richblack-5 font-semibold'>
        {data.courseName}
      </p>

      <p className='text-sm self-start text-left lowercase text-richblack-300'>
        Instructor : {data?.instructor?.firstName} {data?.instructor?.lastName}
      </p>

      <div className='flex gap-x-3 items-baseline text-yellow-50'>
        <p>{Number(averageRatingAndReviewCount) || 0}</p>

        <ReactStars
          count={5}
          edit={false}
          value={averageRatingAndReviewCount}
          size={28}
          color2={"#ffd700"}
          className='translate-y-3'
        />

        <p className='text-sm'>Ratings</p>
      </div>

      <p className='self-start text-caribbeangreen-100'>
        Rs. {data.price}
      </p>

    </div>
  )
}

export default CourseCard


