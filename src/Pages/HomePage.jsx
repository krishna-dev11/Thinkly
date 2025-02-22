import React from 'react'
import Hieghlightedtext from "../Components/Core/Home/Hieghlightedtext"
import { FaLongArrowAltRight } from "react-icons/fa"
import BlackYellowButton from "../Components/Core/Home/BlackYellowButton"
import homepageVideo from "../assets/Images/banner.mp4"


const HomePage = () => {
  return (
    // wrapper
    <div className='h-[6631px] w-[100%] overflow-x-hidden m-0 p-0 box-border bg-richblack-800 '>
    
    {/* section 1 */}
     <div className='flex flex-col '>

      {/* nav  */}
      <div className=' w-screen h-12 border '></div>

      {/* Empower Your Future with Coding Skills section */}
      <div className='h-[15rem] w-[70%] mx-auto mt-8 flex  flex-col gap-y-3'>
       
      <div className='flex mx-auto justify-center bg-white/25 shadow-lg shadow-blue-900/30 backdrop-blur-md rounded-full border border-white/20 items-baseline gap-3 w-[13rem] py-2 '>
        <p className=' text-richblack-200 text-[.9rem]'>Become an Instructor</p>
        <FaLongArrowAltRight  fill='#999DAA' className="translate-y-[.2rem]"/>
      </div>

      <div className='  mx-auto flex items-baseline gap-x-2 '>
        <p className=' text-richblack-5 text-[2rem] font-inter font-600 leading-[2.75rem]'> Empower Your Future with </p>
        <Hieghlightedtext color={"bg-gradient-to-br from-[#0093E9] to-[#80D0C7] bg-clip-text text-transparent text-[2.23rem] font-inter  leading-[2.75rem]"} data={"Coding Skills"}/>   
      </div>

      <p className=' text-richblack-300 font-inter text-[.8rem] text-center'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. </p>

      <div className='mx-auto'>
      <BlackYellowButton buttonData1={"Learn More"}  buttoncolor1={`bg-yellow-50`}   buttonData2={"Book a Demo"}  buttoncolor2={`bg-white/25 shadow-lg shadow-blue-900/30 backdrop-blur-md rounded-full border border-white/20`}/>
      </div>

      </div>


      {/* image part */}
      {/* <div className='mx-auto w-[80%]'>
      <div className='relative'>
      <div className='w-full h-[35.5rem] absolute bg-white translate-x-5 translate-y-5' ></div>
      <div className=' z-[2] absolute '>
      <video muted loop autoPlay >
        <source src={homepageVideo}></source>
      </video>
      </div>
      </div>
      </div> */}
      <div className="mx-auto w-[80%] relative">
  {/* Radial Gradient Background */}
  <div className="absolute inset-0 bg-gradient-radial from-[#22C1C3] to-transparent opacity-50"></div>

  <div className="relative">
    {/* White Box with Shadow Effect */}
    <div className="w-full h-[35.5rem] absolute bg-white translate-x-5 translate-y-5"></div>

    {/* Video Section */}
    <div className="z-[2] absolute">
      <video muted loop autoPlay>
        <source src={homepageVideo}></source>
      </video>
    </div>
  </div>
</div>

     </div>


{/* section 2 */}
      <div></div>
      <div></div>
      <div></div>

    </div>
  )
}

export default HomePage