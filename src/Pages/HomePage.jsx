import React from "react";
import Hieghlightedtext from "../Components/Core/Home/Hieghlightedtext";
import { FaLongArrowAltRight } from "react-icons/fa";
import ReviwSlider from "../Components/Core/Home/ReviwSlider";
import BlackYellowButton from "../Components/Core/Home/BlackYellowButton";
import homepageVideo from "../assets/Images/banner.mp4";
import Text_Running from "../Components/Core/Home/Text_Running";
import frame from "../assets/Images/bghome.svg";
import greenGirlImage from "../assets/Images/TimelineImage.png";
import TimeLine from "../Components/Core/Home/TimeLine";
import SwissKnife from "../Components/Core/Home/SwissKnife"
import Instructor from "../assets/Images/Instructor.png"
import FotterLinks from "../Components/Common/FotterLinks"
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import PowerOfCode from "../Components/Core/Home/PowerOfCode";
import Fotter from "../Components/Common/Fotter";
import BackGroundGradient from "../Components/Common/BackGroundGradient";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import AIGeminiChat from "../Components/Common/AIGeminiChat";
// import GradientInteractiveBox from "../Components/Common/GradientInteractiveBox";

const HomePage = () => {

  const navigate = useNavigate()
  const {token} = useSelector(state=>state.auth)

  return (
    // wrapperh-   h-[6631px]
    <div className=" w-[100%] overflow-x-hidden m-0 p-0 box-border translate-y-10  ">
      {/* nav  */}
     


         <AIGeminiChat />

      {/* section 1 */}
      <div className="flex flex-col gap-10 bg-richblack-900  ">

        {/* Empower Your Future with Coding Skills section */}
        <div className="h-[15rem] w-[70%] mx-auto mt-[5rem] flex  flex-col gap-y-3 ">
          <div className="flex mx-auto justify-center cursor-pointer bg-white/25 shadow-lg shadow-blue-900/30 backdrop-blur-md rounded-full border border-white/20 items-baseline gap-3 w-[13rem] py-2 ">
            <p className=" text-richblack-200 text-[.9rem]" 
            onClick={()=>{
              token ? toast("First you Want to LogOut And Then Create Account as Instructor") :
              navigate("/signUp")
            }}
             >
              Become an Instructor
            </p>
            <FaLongArrowAltRight
              fill="#999DAA"
              className="translate-y-[.2rem]"
            />
          </div>

          
          <div className="  mx-auto flex items-baseline gap-x-2 ">
            <p className=" text-richblack-5 text-[2rem] font-inter font-600 leading-[2.75rem]">
              {" "}
              Empower Your Future with{" "}
            </p>
            <Hieghlightedtext
              color={
                "bg-gradient-to-br from-[#0093E9] to-[#80D0C7] bg-clip-text text-transparent text-[2.23rem] font-inter  leading-[2.75rem]"
              }
              data={"Coding Skills"}
            />
          </div>

          <p className=" text-richblack-300 font-inter text-[.8rem] text-center">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.{" "}
          </p>

          <div className="mx-auto">
            <BlackYellowButton
              buttonData1={"Learn More"}
              buttoncolor1={`bg-yellow-50`}
              buttonData2={"Book a Demo"}
              buttoncolor2={`bg-richblack-800`}
            />
          </div>
        </div>



        {/* video part */}
        <div className="w-[90%] md:w-[80%] lg:w-[77%] h-[30rem] md:h-[32rem] lg:h-[34rem] mx-auto relative">
  <BackGroundGradient 
    shade="bg-[radial-gradient(circle,#1FA2FF_10%,#12D8FA_50%,#A6FFCB_90%)]" 
    position="-top-[3rem] right-[3rem] md:-top-[2rem] md:right-[6rem] lg:-top-[2rem] lg:right-[10rem]" 
    dimensions="w-[25rem] h-[15rem] md:w-[35rem] md:h-[18rem] lg:w-[40rem] lg:h-[20rem]" 
    z="-z-0" 
  />

  <div className="w-full h-[85%] md:h-[100%] sm:h-[100%] bg-white absolute translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5 rounded-sm"></div>

  <video 
    className="absolute w-full h-full object-cover rounded-sm" 
    muted 
    loop 
    autoPlay
  >
    <source src={homepageVideo} />
  </video>
</div>





        {/* 3rd part (text-button and Running code section) */}

        <div className="flex flex-col gap-[4rem]">
          <Text_Running
            textpart1data={"Unlock your"}
            gradienttextdata={"coding potential"}
            textpart2data={"with our online courses."}
            smalltext={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            yellowButtondata={"Try it Yourself"}
            blackbuttondata={"Learn More"}
            flex_type={"flex-row"}
            gradientShade = {"bg-[radial-gradient(circle,#C850C0_10%,#4158D0_40%,#FFCC70_90%)]"}
            code={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
          />

          <Text_Running
            textpart1data={"Start"}
            gradienttextdata={"coding"}
            textpart2data={"in seconds"}
            smalltext={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            yellowButtondata={"Continue Lesson"}
            blackbuttondata={"Learn More"}
            code={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
            flex_type={"flex-row-reverse"}
            gradientShade = {"bg-[radial-gradient(circle,#1FA2FF_10%,#12D8FA_50%,#A6FFCB_90%)]"}
          />

         
        </div>

        {/* 4th part cards */}
        <div className=" w-full">
          <PowerOfCode/>
        </div>
      </div>
      {/* section 1 end */}

      {/* section 2 */}
      <div className=" bg-pure-greys-5 w-full  flex flex-col gap-y-5">
        <div className="w-full flex">
          <img src={frame} />
          <img src={frame} />
          <img src={frame} />
        </div>

        {/* image section */}
        <div>
          {/* upper part */}
          <div className="flex w-[95%] mx-auto">
            <div className="flex flex-col w-[50%] p-6  ">
              <div className="   flex items-baseline gap-x-2 ">
                <p className=" text-richblack-900 text-[2rem] font-inter font-medium leading-[2.75rem]">
                  Get the skills you need for a
                </p>
                <Hieghlightedtext
                  color={
                    "bg-gradient-to-br from-[#0093E9] to-[#80D0C7] bg-clip-text text-transparent text-[2rem] font-inter  leading-[2.75rem]"
                  }
                  data={"Job"}
                />
              </div>
              <Hieghlightedtext
                color={
                  "bg-gradient-to-br from-[#0093E9] to-[#80D0C7] bg-clip-text text-transparent text-[2.23rem] font-inter  leading-[2rem]"
                }
                data={"that is in demand"}
              />
            </div>

            <div className="p-7 space-y-4">
              <p className=" text-richblack-300  font-inter text-[.8rem] ">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a <br /> competitive specialist requires more than
                professional skills.
              </p>
              <button className={`py-2 px-3 rounded-md bg-yellow-50`}>
                Learn More
              </button>
            </div>
          </div>

          {/* lower part */}
          <div className="flex mx-auto  w-[90%] mt-10">

            <div className="w-[40%]  flex justify-center items-center  ">
              <TimeLine />
            </div> 

            <div className="w-[90%] sm:w-[80%] md:w-[65%] lg:w-[50%] h-[24rem] sm:h-[25rem] md:h-[26rem] lg:h-[27rem] mx-auto relative">
  <BackGroundGradient 
    shade="bg-[radial-gradient(circle,#1FA2FF_10%,#12D8FA_50%,#A6FFCB_90%)]" 
    position="top-[4rem] -left-[2rem] sm:top-[5rem] sm:-left-[3rem] md:top-[6rem] md:-left-[5rem]" 
    dimensions="w-[30rem] h-[8rem] sm:w-[40rem] sm:h-[9rem] md:w-[50rem] md:h-[10rem]" 
    z="-z-0" 
  />

  {/* Stats Box */}
  <div className="flex flex-col sm:flex-row bg-caribbeangreen-700 justify-evenly items-center w-[90%] sm:w-[80%] md:w-[70%] h-[6rem] z-30 absolute -bottom-[3rem] left-[5%] sm:left-[8%] md:left-24 rounded-md shadow-md">
    <div className="flex w-full sm:w-[50%] justify-center items-center gap-3">
      <p className="text-white text-[2rem] sm:text-[2.3rem] font-bold">10</p>
      <p className="text-richblack-300 font-inter text-[.6rem] sm:text-[.7rem]">
        YEARS <br /> EXPERIENCES
      </p>
    </div>

    {/* Divider */}
    <div className="hidden sm:block w-[1px] h-[50%] bg-richblack-300 my-auto"></div>

    <div className="flex w-full sm:w-[50%] justify-center items-center gap-3 mt-2 sm:mt-0">
      <p className="text-white text-[2rem] sm:text-[2.3rem] font-bold">250</p>
      <p className="text-richblack-300 font-inter text-[.6rem] sm:text-[.7rem]">
        YEARS <br /> EXPERIENCES
      </p>
    </div>
  </div>

  {/* White Layer */}
  <div className="w-full h-full bg-white absolute z-0 translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4 md:translate-x-5 md:translate-y-5 rounded-sm"></div>

  {/* Image */}
  <img src={greenGirlImage} className="absolute rounded-sm w-full h-full object-cover" />
</div>

          </div>
        </div>

        {/*  learning any language */}
        
        <SwissKnife/>
      </div>



      {/* section 3 */}
      <div className=" bg-richblack-900 flex-col gap-y-5 w-full flex">

{/* instructor part */}
      <div className='h-full w-[85%]   flex mx-auto p-10 mt-10 '>

      <div className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] h-[22rem] sm:h-[25rem] md:h-[27rem] lg:h-[28rem] mx-auto relative">
  {/* White Shadow Layer */}
  <div className="w-full h-full bg-white absolute z-0 -translate-x-2 -translate-y-2 sm:-translate-x-3 sm:-translate-y-3 md:-translate-x-4 md:-translate-y-4 lg:-translate-x-5 lg:-translate-y-5 rounded-sm"></div>

  {/* Instructor Image */}
  <img src={Instructor} className="absolute z-10 w-full h-full object-cover rounded-sm" />
</div>


           
           <div className="w-[50%] flex flex-col gap-4 p-24"> 
           <div className='  flex flex-col '>
             <p className=' text-richblack-5 text-[2rem] font-inter font-600 leading-[2.75rem]'>Become an </p>   
             <Hieghlightedtext color={"bg-gradient-to-br from-[#0093E9] to-[#80D0C7] bg-clip-text text-transparent text-[2.23rem] font-inter  leading-[2.75rem]"} data={"instructor"}/>
           </div>
           <p className=" text-richblack-300 text-[.8rem]">Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
           <button className={`py-2 px-3 rounded-md bg-yellow-50 self-start flex items-baseline gap-2 `}>
                   <p>Start Teaching Today</p>
                   <FaLongArrowAltRight fill='#000814' className=' translate-y-[.1rem]'/>
            </button>
           </div>   
    </div>

    {/* moving cards part */}
     
     <ReviwSlider/>

      </div>
         


         {/* fotter section  */}
      {/* section 4 */}
      <Fotter/>

    </div>
  );
};

export default HomePage;
