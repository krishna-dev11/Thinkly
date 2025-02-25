import React from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SignUpForm = () => {

    const[formData , setformdata] = useState({ FirstName:"" , lastName:"" , contactNo:"" ,CreatePassword:"" ,ConfirmPassword:"" , EmailAddress:"" })
    
       const [showCreatepassword , setshowCreatepassword] = useState(false)
       const [showConfirmPassword , setshowConfirmPassword] = useState(false)
    
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
    <form className=' bg-blue-100' onSubmit={SubmitHandler}>

      <div className='flex gap-x-3'>
      <label>
        <p>First Name</p>
        <input
            type='text'
            placeholder='Enter first name'
            name='FirstName'
            onChange={changeHandler}
            value={formData.FirstName}
        />
      </label>
      <label>
        <p>Last Name</p>
        <input
            type='text'
            placeholder='Enter last name'
            name='lastName'
            onChange={changeHandler}
            value={formData.lastName}
        />
      </label>
      </div>

      <label>
        <p>Email address</p>
        <input
            type='text'
            placeholder='Enter email address'
            name='EmailAddress'
            onChange={changeHandler}
            value={formData.EmailAddress}
        />
      </label>

      <label>
      <div className=' space-x-3'>
        <p>Phone Number</p>
        <input
            type=''
        />
        <input
            type='tel'
        />
      </div>
      </label>

      <div className='flex gap-x-3'>
       <label>
       <p>Create Password</p>
        <input
            type= { showCreatepassword ? "text" : "password" } 
            placeholder='Enter Password'
            name='CreatePassword'
            onChange={changeHandler}
            value={formData.CreatePassword}
        />
        <span onClick={()=>{setshowCreatepassword(!showCreatepassword)}}>
            {
                showCreatepassword ? 
                <FaEyeSlash /> :
                <FaEye />
            }
        </span>
       </label>
       <label>
       <p>Confirm Password</p>
        <input
            type= { showConfirmPassword ? "text" : "password" } 
            placeholder='Enter Password'
            name='ConfirmPassword'
            onChange={changeHandler}
            value={formData.ConfirmPassword}
        />
        <span onClick={()=>{setshowConfirmPassword(!showConfirmPassword)}}>
            {
                showConfirmPassword ? 
                <FaEyeSlash /> :
                <FaEye />
            }
        </span>
       </label>
      </div>

      <button>Create Account</button>

    </form>
  )
}

export default SignUpForm