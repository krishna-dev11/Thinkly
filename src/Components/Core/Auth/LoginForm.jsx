import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';


const LoginForm = () => {

   const[formData , setformdata] = useState({ EmailAddress:"" , Password:""})

   const [showpassword , setShowPassword] = useState(false)

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
        <p>Password</p>
        <input
            type= { showpassword ? "text" : "password" } 
            placeholder='Enter email address'
            name='Password'
            onChange={changeHandler}
            value={formData.Password}
        />
        <span onClick={()=>{setShowPassword(!showpassword)}}>
            {
                showpassword ? 
                <FaEyeSlash /> :
                <FaEye />
            }
        </span>
        <Link to={"*"} >
            <p>Forgot Password</p>
        </Link>
      </label>
      <button>Login</button>

    </form>
  )
}

export default LoginForm