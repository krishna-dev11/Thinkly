import React, { useState } from 'react'
import Fotter from '../Components/Common/Fotter'
import ContactForm from '../Components/Core/About.jsx/ContactForm'
import { chat_visit_call } from '../data/Contact-data'
import * as Icons from "react-icons/fa6"
import ReviwSlider from '../Components/Core/Home/ReviwSlider'

const ContactUsPage = () => {

  return (
    <div className=' w-full  bg-richblack-900  translate-y-10 '>

        {/* contact Form  */}
        <div className=' w-[85%] flex gap-x-10  mx-auto justify-between py-20 '>
           
           <div className=' w-[50%] bg-richblack-700  rounded-md flex flex-col gap-y-5 px-10 py-10 h-[23rem] '> 
              {
                chat_visit_call.map((CVC)=>{
                    let Icon = Icons[CVC.icon]
                    {/* console.log(<Icon/>) */}

                    return (
                    <div className='flex gap-x-5 items-baseline' key={CVC.id}> 
                        
                        <Icon size={25} fill={"#838894"}/>
                        <div>
                            <p className="text-richblack-5 text-[1.5rem] md:text-[1.7rem] font-semibold font-inter leading-[2.5rem] md:leading-[2.75rem]">{CVC.heading}</p>
                            <p className=" text-richblack-300 font-inter text-[.8rem] ">{CVC.description}</p>
                            <p className=" text-richblack-300 font-inter text-[.8rem] ">{CVC.detail}</p>
                        </div>

                    </div>
                    )
              })
              }
           </div>
           <div className= " w-[50%] mx-auto">
              <ContactForm heading={"Got a Idea? We've got the skills. Let's team up"} description={"Tall us more about yourself and what you're got in mind."} />
            </div>



        </div>

  {/* section5 slider */}
     <div className=' bg-richblack-900'>
     <ReviwSlider/>
     </div>        

        <Fotter/>




    </div>
  )
}

export default ContactUsPage