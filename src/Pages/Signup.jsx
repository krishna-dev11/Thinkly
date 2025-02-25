import React from 'react'
import signupImg from "../assets/Images/signup.webp"
import Template from '../Components/Core/Auth/Template'

const Signup = () => {
  return (
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      desc1="Donate life, Find Hope, Save Lives"
      desc2="From Compassion to Connection-Organizing Life"
      image={signupImg}
      formtype="signup"
    />
  )
}

export default Signup