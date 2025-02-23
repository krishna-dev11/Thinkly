import React from 'react'
import yourProgress from "../../../assets/Images/Know_your_progress.png"
import compareOther from "../../../assets/Images/Compare_with_others.png"
import planLessons from "../../../assets/Images/Plan_your_lessons.png"
import Hieghlightedtext from "./Hieghlightedtext";


const SwissKnife = () => {
  return (
    <div className=' w-full mt-[8rem] flex flex-col gap-y-[6rem]  '>

      <div className='flex flex-col space-y-2 mx-auto'>
      <div className='flex gap-x-2'>
      <p className=" text-richblack-800 text-[2rem] font-inter font-600 leading-[2.75rem]">
              {" "}
              Your swiss knife for{" "}
            </p>
      <Hieghlightedtext
              color={
                "bg-gradient-to-br from-[#0093E9] to-[#80D0C7] bg-clip-text text-transparent text-[2.23rem] font-inter  leading-[2.75rem]"
              }
              data={" learning any language"}
            /> 
      </div>
      <p className=" text-richblack-300 font-inter text-[.8rem] text-center">
      Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, <br/> progress tracking, custom schedule and more.{" "}
      </p>
      </div>

      <div className='flex mx-auto'>
        <img src={yourProgress} className='w-[20rem] h-[20rem] translate-x-[5rem]'/>
        <img src={compareOther}  className='w-[25rem] h-[25rem] z-10 translate-y-[-2rem]'/>
        <img src={planLessons}  className='w-[23rem] h-[23rem] z-20 translate-x-[-8rem] translate-y-[-1.5rem]' />
      </div>

      <button className={`py-2 px-3 self-center rounded-md bg-yellow-50 translate-y-[-5rem]`}>Learn More</button>
    </div>
  )
}

export default SwissKnife