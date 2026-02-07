import React from 'react'
import signupImg from "../assets/Images/signup.webp"
import Template from '../Components/Core/Auth/Template'

const Signup = () => {
  return (
    <Template
      title="Thinkly"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career..."
      image={signupImg}
      formtype="signup"
    />
  )
}

export default Signup