import React from 'react'
import frame from '../../../assets/Images/frame.png'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const Template = ({title , desc1 , desc2 , image , formtype}) => {
  return (
    <div className=' h-screen w-screen bg-richblack-900 flex flex-col'>
     <div className='h-[3rem] w-full bg-richblack-800'></div>
     
     {/*  */}
     <div className=' w-[90%] h-full flex mx-auto '>

      <div className=' w-[50%] h-full bg-caribbeangreen-25 flex flex-col justify-center px-10'>

        <p >{title}</p>

        <div>
          <p>{desc1}</p>
          <p>{desc2}</p>
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