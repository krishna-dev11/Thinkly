import React from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Tab from '../../Common/Tab';
import { ACCOUNT_TYPE } from '../../../Utilities/Constaints';
import { TabData } from '../../../Utilities/Constaints';
import { useDispatch } from 'react-redux';
import {setSignUpData} from "../../../Slices/Auth"
import { sendOtp } from '../../../Services.jsx/Operations/authAPI';
import { setUser } from '../../../Slices/Profile';

const SignUpForm = () => {

    const[formData , setformdata] = useState({ FirstName:"" , lastName:""  ,CreatePassword:"" ,ConfirmPassword:"" , EmailAddress:"" })
    
       const [showCreatepassword , setshowCreatepassword] = useState(false)
       const [showConfirmPassword , setshowConfirmPassword] = useState(false)
       const [accountType , setaccountType] = useState(ACCOUNT_TYPE.STUDENT)

      //  const {signUpData} = useSelector(state=>state.auth)
       const dispatch = useDispatch()

       const navigate = useNavigate()
    
        const changeHandler = (event)=>{
            const {type , name , value ,checked} = event.target
            setformdata((prev)=>{
                return {
                    ...prev,
                [name] : type === 'checkbox' ? checked : value 
                }
            })
        }


        const SubmitHandler = (event)=>{
          event.preventDefault();

          if(formData.ConfirmPassword !== formData.CreatePassword)
          {
            toast.error("password Can`t Match")
            return
          }

          const data = {
            ...formData , accountType
          }

          // console.log(data , ":")

          dispatch(setSignUpData(data))

          dispatch(sendOtp(formData.EmailAddress , navigate))
 
          dispatch(setUser(data))
          // console.log("sunny")
          
        }

        

  return (
     <div className='flex flex-col gap-y-3'>
        
    <Tab tabData = {TabData} accountType = {accountType}  setaccountType = {setaccountType} />

    <form className=' ' onSubmit={SubmitHandler} >

      <div className='flex gap-x-2'>
      <label>
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">First Name<sup className="text-pink-200">*</sup>
        </p>
        <input
            required
            className='w-full rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5'
            type='text'
            placeholder='Enter first name'
            name='FirstName'
            onChange={changeHandler}
            value={formData.FirstName}
            style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        />
      </label>
      <label>
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Last Name<sup className="text-pink-200">*</sup>
      </p>
        <input
            required
            className='w-full rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5'
            type='text'
            placeholder='Enter last name'
            name='lastName'
            onChange={changeHandler}
            value={formData.lastName}
            style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        />
      </label>
      </div>

      <label>
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address<sup className="text-pink-200">*</sup>
      </p>
        <input
            required
            type='text'
            placeholder='Enter email address'
            name='EmailAddress'
            onChange={changeHandler}
            value={formData.EmailAddress}
            style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className='w-full rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5'
        />
      </label>


      <div className='flex gap-x-3'>
       <label className='relative'>
       <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Create Password<sup className="text-pink-200">*</sup></p>
        <input
            required
            className='w-full rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5'
            type= { showCreatepassword ? "text" : "password" } 
            placeholder='Enter Password'
            name='CreatePassword'
            onChange={changeHandler}
            value={formData.CreatePassword}
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
            placeholder='Enter Password'
            name='ConfirmPassword'
            onChange={changeHandler}
            value={formData.ConfirmPassword}
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

      <button
        type="submit"
        className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Create Account
      </button>

    </form>

     </div>
  )
}

export default SignUpForm