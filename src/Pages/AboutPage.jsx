import React from 'react'
import { topImages } from '../data/aboutus-data';
import Hieghlightedtext from '../Components/Core/Home/Hieghlightedtext'
import { PiQuotesFill } from "react-icons/pi";
import QuoteSection from '../Components/Core/About.jsx/QuoteSection'
import FoundingStory from '../Components/Core/About.jsx/FoundingStory'
import { Accomplishment } from '../data/aboutus-data'
import Grey_whiteBox from '../Components/Core/About.jsx/Grey_whiteBox'
import Fotter from '../Components/Common/Fotter';
import ContactForm from '../Components/Core/About.jsx/ContactForm';
import ReviwSlider from '../Components/Core/Home/ReviwSlider';


const AboutPage = () => {

  return (
    <div className='  w-[100%] overflow-x-hidden m-0 p-0 box-border translate-y-10  '>
      
      {/* section 1 */}
      <div className=' w-full bg-richblack-800 '>

        <div className=' mx-auto w-[85%] py-40 relative'>

        <div className=' flex flex-col  mx-auto w-[80%] justify-center items-center -translate-y-20 '>
            <p className=" text-richblack-300 font-inter text-[.8rem] text-center ">About us</p>
            <p className=" text-richblack-5 text-[2rem] font-inter font-600 leading-[2.75rem] mt-10">Driving Innovation in Online Education for a </p>
            <Hieghlightedtext
              color={
                "bg-gradient-to-br from-[#0093E9] to-[#80D0C7] bg-clip-text text-transparent text-[2.23rem] font-inter  leading-[2.75rem]"
              }
              data={"Brighter Future"}
            />
            <p className=" text-richblack-300 font-inter text-[.8rem] text-center">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
        </div>

        <div className=' flex justify-evenly  w-full absolute mx-auto'>
           {
            topImages.map((image)=>(
               <img src={image.imageUrl} key={image.id} className=' w-[21rem]' ></img>
            ))
           }
        </div>


        </div>
        
      </div>


      {/* section 2 */}
    <div className=' w-full bg-richblack-900'>
        <QuoteSection/>
        <div className=' w-[80%] h-[.5px] bg-richblack-400 mx-auto  -translate-y-10'></div>
        <FoundingStory/>
    </div>

    {/* section - 3 */}
    <div className=' w-full bg-richblack-700 py-10'>
      <div className=' w-[95%] mx-auto flex justify-evenly'>
      {
        Accomplishment.map((accomplish)=>(
          <div className=' flex flex-col gap-y-3 justify-center items-center text-center' key={accomplish.id}>
            <p className="text-richblack-5 text-[1.5rem] md:text-[1.7rem] font-semibold font-inter leading-[2.5rem] md:leading-[2.75rem]">{accomplish.heading}</p>
            <p className=" text-richblack-300 font-inter text-[.8rem] ">{accomplish.description}</p>
          </div>
        ))
      }
      </div>
    </div>


    {/* section 4 */}
    <div className='w-full  flex flex-col gap-y-32  bg-richblack-900 py-32'>
      <Grey_whiteBox/>
      <div className= " w-[40%] mx-auto">
      <ContactForm heading={"Get in Touch"} description={"We’d love to here for you, Please fill out this form."}/>
      </div>
    </div>

  {/* section5 slider */}
     <div className=' bg-richblack-900'>
     <ReviwSlider/>
     </div>

    {/* section 6 - footer */}

    <Fotter/>

    


    </div>
  )
}

export default AboutPage