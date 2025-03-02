import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { sendTokenLink } from '../Services.jsx/Operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {


    const [formData , setFormData] = useState({Email:""})
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const changeHandler = (event)=>{
        const {type , name , value ,checked} = event.target
        setFormData((prev)=>{
            return {
                ...prev,
            [name] : type === 'checkbox' ? checked : value 
            }
        })
    }

    const SubmitHandler = (event)=>{
        event.preventDefault();

        dispatch(sendTokenLink(formData.Email , navigate))

        
    }

  return (
    <div className=' flex  flex-col gap-y-5 h-screen w-full justify-center items-center bg-richblack-900'>
       <p className=' text-xl text-white font-semibold'>Reset Your Password</p>

       <p className=' text-richblack-300 font-inter text-[.8rem] '>Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery</p>
       
       <form onSubmit={SubmitHandler}>
           <label>
              <p className='text-white'>Email Address <sup className='text-pink-200 '>*</sup></p>
              <input
                 required
                 type='email'
                 placeholder='Enter Your Email'
                 name='Email'
                 onChange={changeHandler}
                 value={formData.Email}
              />
           </label>

           <button
        type="submit"
        className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Reset Password
      </button>
       </form>

       <Link  to={"/"} className='flex gap-x-3'>
         <FaArrowLeftLong />
          <p>Back to login</p>
       </Link>
    </div>
  )
}

export default ForgotPassword