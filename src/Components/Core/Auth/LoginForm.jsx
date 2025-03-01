import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Tab from '../../Common/Tab';
import { TabData } from '../../../Utilities/Constaints';
import { ACCOUNT_TYPE } from '../../../Utilities/Constaints';

const LoginForm = () => {

   const[formData , setformdata] = useState({ EmailAddress:"" , Password:""})

   const [showpassword , setShowPassword] = useState(false)
  const [currentTab , setCurrentTab] = useState(ACCOUNT_TYPE.STUDENT)
   

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
        console.log(formData)
        
    }


  return (

    <div>
      <Tab tabData = {TabData} currentTab = {currentTab}  setCurrentTab = {setCurrentTab} />

<form className=' flex flex-col gap-3 ' onSubmit={SubmitHandler}>

  <label className="w-full">
    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
      Email Address <sup className="text-pink-200">*</sup>
    </p>
    <input
        className='w-full rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5'
        type='text'
        placeholder='Enter email address'
        name='EmailAddress'
        onChange={changeHandler}
        value={formData.EmailAddress}
        style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
    />
  </label>
  <label  className='relative'>
    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 ">Password <sup className="text-pink-200">*</sup></p>
    <input
        type= { showpassword ? "text" : "password" } 
        placeholder='Enter password'
        name='Password'
        onChange={changeHandler}
        value={formData.Password}
        className="w-full rounded-[0.5rem] bg-richblack-800 p-[10px] text-richblack-5 focus:outline-none"
      style={{
         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
         
            }}
    />
    <span onClick={()=>{setShowPassword(!showpassword)}} className=' top-10 right-5 absolute'>
        {
            showpassword ? 
            <FaEyeSlash fill='white'/> :
            <FaEye fill='white'/>
        }
    </span>
    <Link to={"/forgot-password"} className=' text-blue-200 text-sm absolute top-[4.7rem] right-0' >
        <span>Forgot Password</span>
    </Link>
  </label>
  <button
    type="submit"
    className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
  >
    Sign In
  </button>

</form>
    </div>

  )
}

export default LoginForm