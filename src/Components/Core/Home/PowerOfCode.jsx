import React, { use, useState } from 'react'
import Hieghlightedtext from './Hieghlightedtext'
import { HomePageExplore } from '../../../data/homepage-explore'
import { LuNetwork } from "react-icons/lu";
import { BsPersonFill } from "react-icons/bs";

const PowerOfCode = () => {

    const [currentTab , setCurrentTab] = useState(HomePageExplore[0].tag)
    const [currentCourse , setcurrentCourse] = useState(HomePageExplore[0].courses)
    const [currentCard , setcurrentCard] = useState(currentCourse[0].heading)
    // console.log(currentCard)
 

    const setMyCards = (value) => {
        setCurrentTab(value)
        const result = HomePageExplore.filter((course) => course.tag === value);
        setcurrentCourse(result[0].courses);
        setcurrentCard(result[0].courses[0].heading)
    };

  return (
    <div className='flex flex-col items-center gap-y-2 w-11/12  mx-auto justify-center relative py-[8rem]'>

        <div className='flex gap-x-2'> 
        <span className=" text-richblack-5 text-[2rem] font-inter font-600 leading-[2.75rem]">Unlock the</span>
         <span>
         <Hieghlightedtext
              color={
                "bg-gradient-to-br from-[#0093E9] to-[#80D0C7] bg-clip-text text-transparent text-[2.23rem] font-inter  leading-[2.75rem]"
              }
              data={"Power Of Code"}
            /> 
         </span> 
        </div>

        <p className=' text-richblack-300 font-inter text-[.8rem] '>Learn to Build Anything You Can Imagine</p>

        <div className=' w-[60%] bg-richblack-700 flex gap-x-2 h-[3rem] bshadow-lg shadow-blue-900/30 backdrop-blur-md rounded-full  border-b-[2px] border-white/20 px-[.3rem]'>
            {
               HomePageExplore.map((singleButton , index)=>(
                <button key={index} className={`flex w-full ${ currentTab === singleButton.tag ? "bg-richblack-900" :" text-richblack-400"}  text-white justify-center items-center hover:bg-richblack-900
             rounded-full h-[80%] my-auto`} onClick={()=>setMyCards(singleButton?.tag)}>{singleButton?.tag}</button>
               ))
            }
        </div>

        <div className='flex justify-evenly w-full absolute top-[18rem]'>{
           currentCourse.map((singleCourse , index)=>(
        <div className={`h-[19rem] w-[20rem] bg-richblack-800 rounded-sm flex flex-col key={index}`}  key={index}>
                <div className='h-[90%] border-b-[2px] border-dashed border-richblack-400 flex flex-col  p-5 mx-auto gap-6 '>
                    <span className=' text-xl text-richblack-5 font-inter font-semibold'>{singleCourse.heading}</span>
                    <p className=' text-richblack-300 font-inter text-[.9rem]'>{singleCourse.description}</p>
                </div>
                <div className=' w-full flex justify-between items-center p-4'>
                    <span className='flex gap-x-2'>
                    <BsPersonFill fill='#6e727f' size={20}/>
                        <p className=' text-richblack-400'>{singleCourse.level}</p>
                    </span>
                    <span className='flex gap-x-2'>
                        <LuNetwork color='#6e727f' size={20}/>
                        <p className=' text-richblack-400'>{singleCourse.lessionNumber} Lessions</p>
                    </span>
                </div>
            </div>
           ))
        }</div>

        

    </div>
  )
}

export default PowerOfCode