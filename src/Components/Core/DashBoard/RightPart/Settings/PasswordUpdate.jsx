import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { ChangePassword } from '../../../../../Services.jsx/Operations/DashBoard';


const PasswordUpdate = () => {

    const [showCreateNewpassword , setshowCreateNewpassword] = useState(false)
    const [showConfirmNewPassword , setshowConfirmNewPassword] = useState(false)
    const [showOldPassword , setshowOldPassword] = useState(false)


    const dispatch = useDispatch()
    const {token} = useSelector(state=>state.auth)
    
    const navigate = useNavigate()

    const {

        register,
        reset,
        handleSubmit,
        formState:{errors , isSubmitSuccessful}

    } = useForm()

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                newPassword:"",
                confirmNewPassword:"",
                oldPassword:""
            })
        }
    })




    const submitNewPassword = async(event)=>{
        try{


            // console.log(event)
            if(!event.oldPassword){
                return toast.error("Old Password is manditory")
            }
   
            if(event.NewPassword !== event.ConfirmNewPassword)
            {
                return  toast.error("Password can't match")
            }

           dispatch(ChangePassword(token , event))            
            
        }catch(error){
            console.log(error)
        }
    }


  return (
    <form onClick={handleSubmit(submitNewPassword)} className=' flex flex-col gap-y-5 items-end'>
        <div className=" flex flex-col py-4 rounded-md px-5 w-full bg-richblack-800  gap-x-3 items-center border border-richblack-700">

                 <div className='flex gap-x-3 w-full justify-evenly'>

                 <label className='relative w-[32%]'>
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Create Password<sup className="text-pink-200">*</sup></p>
                   <input
                       className='w-full rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder-gray-500 text-richblack-5'
                       type= { showOldPassword ? "text" : "password" } 
                       placeholder='Enter old Password'
                       name='oldPassword'
                       {...register("oldPassword" , {
                        required:{
                            value:true,
                            message:"Please Enter New Password"
                        }
                       })}
                       style={{
                       boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                     }}
                   />
                   <span onClick={()=>{setshowOldPassword(!showOldPassword)}} className='top-10 right-5 absolute'>
                       {
                        showCreateNewpassword ? 
                           <FaEyeSlash fill='white' /> :
                           <FaEye fill='white'/>
                       }
                   </span>
                  </label>

                  <label className='relative w-[32%]'>
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Create Password<sup className="text-pink-200">*</sup></p>
                   <input
                       type= { showCreateNewpassword ? "text" : "password" } 
                       className='w-full rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder-gray-500 text-richblack-5'
                       placeholder='Enter New Password'
                       name='newPassword'
                       {...register("newPassword" , {
                        required:{
                            value:true,
                            message:"Please Enter New Password"
                        }
                       })}
                       style={{
                       boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                     }}
                   />
                   <span onClick={()=>{setshowCreateNewpassword(!showCreateNewpassword)}} className='top-10 right-5 absolute'>
                       {
                        showCreateNewpassword ? 
                           <FaEyeSlash fill='white' /> :
                           <FaEye fill='white'/>
                       }
                   </span>
                  </label>

                  <label className=' relative w-[32%]'>
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm Password<sup className="text-pink-200">*</sup></p>
                   <input
                       required
                       className='w-full rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder-gray-500 text-richblack-5'
                       type= { showConfirmNewPassword ? "text" : "password" } 
                       placeholder='Enter Confirm Password'
                       name='confirmNewPassword'
                       {...register("confirmNewPassword" , {
                        required:{
                            value:true,
                            message:"Please Enter Confirm Password"
                        }
                       })}
                       style={{
                       boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                     }}
                   />
                   <span onClick={()=>{setshowConfirmNewPassword(!showConfirmNewPassword)}} className='top-10 right-5 absolute'>
                       {
                        showConfirmNewPassword ? 
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