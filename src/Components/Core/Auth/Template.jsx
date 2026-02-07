import React from 'react'
import frame from '../../../assets/Images/frame.png'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'


const Template = ({title , desc1 , desc2 , image , formtype}) => {
  return (
    <div className='h-screen w-full bg-richblack-900 flex flex-col'>
     
     {/*  */}
     <div className=' w-[90%] bg-white  flex bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-md  gap-y-4   justify-between mx-auto px-2 translate-y-5  h-[80%] items-center my-auto'>

      <div className=' w-[40%]  min-h-[96%] bg-richblack-900 py-5  rounded-md my-auto  flex flex-col gap-y-3 justify-center px-10  '>

        <p className='text-richblack-5 text-[1.5rem] font-semibold font-inter font-600 leading-[2.75rem]'>{title}</p>

        <div className='flex  w-[25rem] '>
          <span className=' text-richblack-100 '> {desc1}  <span className=' text-blue-100 font-edu-sa font-semibold italic'>{desc2}</span> </span>
          
        </div>

        <div>{
          formtype === "login" ? <LoginForm/> : <SignUpForm/>
        }</div>

      </div>
       {/* <div className=' w-[50%] h-full  relative flex justify-center items-center'>
           <img src={frame} className=' absolute w-[30rem] translate-x-4 translate-y-4 rounded-xl'></img>
           <img src={image} className='w-[30rem] absolute rounded-md '></img>
       </div> */}

       <div className='w-[59%] min-h-[96%] rounded-md  relative flex justify-center items-center bg-[linear-gradient(0deg,_#260244,_#FA97FF)]'>{
        formtype === "login" ? <iframe  src="https://lottie.host/embed/54b778e3-c5b4-45d6-8f10-5973472b3a13/vmZb5OUBRS.lottie" className=' h-[500px] w-[1000px]'></iframe>  : <iframe src="https://lottie.host/embed/ebc9bc5f-d40e-4bae-8da1-21f4e0aee77f/75N8Mi0SwH.lottie" className=' h-[500px] w-[1000px]'></iframe>
        }</div>

     </div>
    </div>
  )
}

export default Template