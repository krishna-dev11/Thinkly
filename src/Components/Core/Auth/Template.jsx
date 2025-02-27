import React from 'react'
import frame from '../../../assets/Images/frame.png'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const Template = ({title , desc1 , desc2 , image , formtype}) => {
  return (
    <div className='h-screen w-full bg-richblack-900 flex flex-col'>
     
     {/*  */}
     <div className=' w-[80%] h-full flex mx-auto '>

      <div className=' w-[50%] h-full  flex flex-col gap-y-3 justify-center px-10'>

        <p className='text-richblack-5 text-[1.5rem] font-semibold font-inter font-600 leading-[2.75rem]'>{title}</p>

        <div className='flex  w-[25rem] '>
          <span className=' text-richblack-100 '> {desc1}  <span className=' text-blue-100 font-edu-sa font-semibold italic'>{desc2}</span> </span>
          
        </div>

        <div>{
          formtype == "login" ? <LoginForm/> : <SignUpForm/>
        }</div>

      </div>
       <div className=' w-[50%] h-full  relative flex justify-center items-center'>
           <img src={frame} className=' absolute w-[30rem] translate-x-4 translate-y-4'></img>
           <img src={image} className='w-[30rem] absolute'></img>
       </div>

     </div>
    </div>
  )
}

export default Template