import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../Services.jsx/Operations/authAPI'
import { useNavigate } from 'react-router-dom'

const EnterOtp = () => {

  const [FormData , setFromData] = useState({otp:""})

  const {signUpData} = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

   console.log(signUpData)

  function changeHandler(event){
    const{name , value , checked , type}  = event.target
    setFromData((pre)=>{
      return {
        ...pre ,
      [name] : type === "checkbox" ? checked : value
       }
    })
  }

  const submitHandler = (event)=>{
    event.preventDefault()

    const{ FirstName, lastName ,CreatePassword , ConfirmPassword , EmailAddress , accountType} = signUpData

  // console.log(FormData.otp , "hi")

    dispatch(signUp(FirstName, lastName  , EmailAddress , CreatePassword , ConfirmPassword  , accountType , FormData.otp , navigate ))
  //   console.log(FormData.otp , "hiii")
  }

  return (
    <div className=' h-screen w-full bg-richblack-900 flex justify-center items-center flex-col  text-3xl '>
      <form onSubmit={submitHandler}>
          <label>
            <p className=' text-white'>enter otp</p>
            <input
              type='text'
              placeholder='enterOtp'
              name='otp'
              onChange={changeHandler}
              value={FormData.otp}
            />
          </label> 
          <button type='submit' className='text-white'>submit</button>
      </form>
    </div>
  )
}

export default EnterOtp