import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useForm } from 'react-hook-form';


const PasswordUpdate = () => {

    const [showCreatepassword , setshowCreatepassword] = useState(false)
    const [showConfirmPassword , setshowConfirmPassword] = useState(false)

    const {

        register,
        reset,
        handleSubmit,
        formState:{errors , isSubmitSuccessful}

    } = useForm()

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                NewPassword:"",
                ConfirmNewPassword:""
            })
        }
    })

    const navigate = useNavigate()



    const submitNewPassword = async()=>{
        try{

        }catch(error){
            
        }
    }


  return (
    <form onClick={handleSubmit(submitNewPassword)}>
        <div className=" flex flex-col py-4 rounded-md px-5 w-full bg-richblack-800  gap-x-3 items-center border border-richblack-700">
                 <div className='flex gap-x-3'>
                  <label className='relative'>
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Create Password<sup className="text-pink-200">*</sup></p>
                   <input
                       className='w-full rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5'
                       type= { showCreatepassword ? "text" : "password" } 
                       placeholder='Enter New Password'
                       name='NewPassword'
                       {...register("NewPassword" , {
                        required:{
                            value:true,
                            message:"Please Enter New Password"
                        }
                       })}
                       style={{
                       boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                     }}
                   />
                   <span onClick={()=>{setshowCreatepassword(!showCreatepassword)}} className='top-10 right-5 absolute'>
                       {
                           showCreatepassword ? 
                           <FaEyeSlash fill='white' /> :
                           <FaEye fill='white'/>
                       }
                   </span>
                  </label>
                  <label className=' relative'>
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm Password<sup className="text-pink-200">*</sup></p>
                   <input
                       required
                       className='w-full rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5'
                       type= { showConfirmPassword ? "text" : "password" } 
                       placeholder='Enter Confirm Password'
                       name='ConfirmNewPassword'
                       {...register("ConfirmNewPassword" , {
                        required:{
                            value:true,
                            message:"Please Enter Confirm Password"
                        }
                       })}
                       style={{
                       boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                     }}
                   />
                   <span onClick={()=>{setshowConfirmPassword(!showConfirmPassword)}} className='top-10 right-5 absolute'>
                       {
                           showConfirmPassword ? 
                           <FaEyeSlash fill='white'/> :
                           <FaEye fill='white'/>
                       }
                   </span>
                  </label>
                 </div> 
        </div>

        <div className=" flex gap-x-3">
          <button className=" px-3 py-2 rounded-md bg-richblack-400 "
          onClick={()=>{navigate("/dashboard/my-profile")}}>
               Cancel
          </button>
          <button
          type="submit"
           className=" px-3 py-2 rounded-md bg-yellow-50 ">
               Save
          </button>
       </div>
    </form>
  )
}

export default PasswordUpdate