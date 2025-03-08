import React from 'react'
import { RiDeleteBinLine } from "react-icons/ri";

const DeleteAccount = () => {
  return (
    <button className=" flex py-4 rounded-md px-5 w-full bg-pink-900 opacity-50  gap-x-3 items-center border border-richblack-700">

         <div className=' h-[3rem] w-[3rem] rounded-full bg-pink-700'>
            <RiDeleteBinLine fill='white'/>
         </div>
         <div className=' flex flex-col gap-y-2 w-[50%] '>
            <p className=' text-richblack-5 font-inter text-lg font-semibold'>Delete Account</p>
            <p className=' text-richblack-50 font-inter'>Would you like to delete account?</p>
            <p className=' text-richblack-50 font-inter'>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
         </div>
         <p className=' text-pink-700'>I want to delete my account.</p>

    </button>
  )
}

export default DeleteAccount