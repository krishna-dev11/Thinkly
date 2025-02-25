import React from "react";
import Hieghlightedtext from "../Components/Core/Home/Hieghlightedtext";
import { FaLongArrowAltRight } from "react-icons/fa";
import BlackYellowButton from "../Components/Core/Home/BlackYellowButton";
import homepageVideo from "../assets/Images/banner.mp4";
import Text_Running from "../Components/Core/Home/Text_Running";
import frame from "../assets/Images/bghome.svg";
import greenGirlImage from "../assets/Images/TimelineImage.png";
import TimeLine from "../Components/Core/Home/TimeLine";
import SwissKnife from "../Components/Core/Home/SwissKnife"
import Instructor from "../assets/Images/Instructor.png"
import FotterLinks from "../Components/Core/Home/FotterLinks"
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const HomePage = () => {
  return (
    // wrapperh-   h-[6631px]
    <div className=" w-[100%] overflow-x-hidden m-0 p-0 box-border  ">
      {/* nav  */}
      <div className=" w-screen h-12 shadow-lg bg-richblack-800 shadow-blue-900/30 backdrop-blur-md  border-b-[1px] border-white/20 "></div>

      {/* section 1 */}
      <div className="flex flex-col gap-10 bg-richblack-800 ">
        {/* Empower Your Future with Coding Skills section */}
        <div className="h-[15rem] w-[70%] mx-auto mt-8 flex  flex-col gap-y-3">
          <div className="flex mx-auto justify-center bg-white/25 shadow-lg shadow-blue-900/30 backdrop-blur-md rounded-full border border-white/20 items-baseline gap-3 w-[13rem] py-2 ">
            <p className=" text-richblack-200 text-[.9rem]">
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
        <div className="w-[77%] h-[34rem] mx-auto relative ">
          <div className=" w-full h-full bg-white absolute z-0 translate-x-5  translate-y-5"></div>
          <video className=" absolute" muted loop autoPlay>
            <source src={homepageVideo}></source>
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
          />
        </div>

        {/* 4th part cards */}
        <div></div>
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

            <div className="w-[50%] h-[27rem] mx-auto relative ">
              <div className=" flex bg-caribbeangreen-700 justify-evenly w-[70%] h-[6rem] z-30 absolute bottom-[-3rem] left-24">
                <div className="flex w-[50%]  justify-center  items-center gap-3">
                  <p className="text-white text-[2.3rem] font-bold ">10</p>
                  <p className="text-richblack-300  font-inter text-[.6rem]">
                    YEARS <br /> EXPERIENCES
                  </p>
                </div>
                <div className="w-[1px] h-[50%] bg-richblack-300 my-auto"></div>
                <div className="flex w-[50%]  justify-center  items-center gap-3">
                  <p className="text-white text-[2.3rem] font-bold ">250</p>
                  <p className="text-richblack-300  font-inter text-[.6rem]">
                    YEARS <br /> EXPERIENCES
                  </p>
                </div>
                <div></div>
              </div>
              <div className=" w-full h-full bg-white absolute z-0 translate-x-5  translate-y-5"></div>
              <img src={greenGirlImage} className=" absolute" />
            </div>

          </div>
        </div>

        {/*  learning any language */}
        
        <SwissKnife/>
      </div>



      {/* section 3 */}
      <div className=" bg-richblack-900 w-full flex">

{/* instructor part */}
      <div className='h-full w-[85%]   flex mx-auto p-10 mt-10 '>

        <div className="w-[50%] h-[28rem]  mx-auto relative ">
          <div className=" w-full h-full bg-white absolute z-0 -translate-x-5  -translate-y-5 "></div>
          <img src={Instructor} className=" absolute z-10"/>
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
    
      </div>
         


         {/* fotter section  */}
      {/* section 4 */}
       <div className=" bg-richblack-800  h-[40rem] w-full shadow-lg shadow-blue-900/30 backdrop-blur-md  border-t-[1px] border-white/20 flex flex-col ">       
       <FotterLinks/>
       <div  className=" bg-richblack-800  h-[5rem] w-[80%] mx-auto shadow-lg shadow-blue-900/30 backdrop-blur-md  border-t-[1px] border-white/20 flex justify-between items-center  " >

        <div className="flex gap-x-3  h-[50%] justify-center items-center ">
          <Link to={"/policy"} className=" text-sm  text-richblack-400 ">Privacy</Link>
          <div className="w-[.1rem] h-[40%] bg-richblack-400 my-auto "></div>
          <Link to={"/policy"} className=" text-sm text-richblack-400 ">Cookie Policy</Link>
          <div className="w-[.1rem] h-[40%] bg-richblack-400 my-auto "></div>
          <Link to={"/policy"} className=" text-sm text-richblack-400 ">Terms</Link>
        </div>

        <div className="flex items-center justify-center gap-x-2 text-sm text-richblack-400">
          <p>Made with</p>
          <FaHeart fill="red" size={10}/>
          <p>CodeHelp @ 2025 Studynotion</p>
        </div>
       </div>
       </div>

    </div>
  );
};

export default HomePage;
