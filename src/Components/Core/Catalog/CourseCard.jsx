import React from 'react'
import { useNavigate } from 'react-router-dom'

const CourseCard = ({data}) => {
  
  const navigate = useNavigate()

  return (
    <div className=' flex flex-col gap-y-1 w-[300px] bg-pink-200 rounded-md px-3 py-3 min-h-[20rem] max-h-[20rem]'
           onClick={()=>navigate(`/CourseDetails/${data._id}`)}
      >
       <img src={data.thumbnail} className='  ' />
       <p className=' text-sm self-start text-left'>{data.courseDescription}</p>
       <p className=' self-start'>{`Rs. ${data.price}`}</p>
    </div>
  )
}

export default CourseCard