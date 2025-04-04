import React from 'react'

const CourseCard = ({data}) => {
  return (
    <div className=' flex flex-col gap-y-1 w-[300px] bg-pink-200 rounded-md px-3 py-3 min-h-[20rem] max-h-[20rem]'
           onClick={()=>{console.log(data._id)}}
      >
       <img src={data.thumbnail} className='  ' />
       <p className=' text-sm self-start text-left'>{data.courseDescription}</p>
       <p className=' self-start'>{`Rs. ${data.price}`}</p>
    </div>
  )
}

export default CourseCard