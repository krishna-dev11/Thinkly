import React from 'react'
import {Founding} from "../../../data/aboutus-data"
import Hieghlightedtext from '../Home/Hieghlightedtext'
import BackGroundGradient from '../../Common/BackGroundGradient'

const FoundingStory = () => {
  return (
    <div className=' flex flex-wrap w-[85%]  mx-auto '>
        {
           Founding.map((story)=>(
            story.type === Image ? (
                <div className=' w-[45%] flex flex-col p-10 justify-center items-center relative' key={story.id}>
                     <BackGroundGradient shade={"bg-[linear-gradient(118deg,#EC008C_-0.91%,#FC6767_104.91%)]"} position={""} dimensions={"w-[20rem] h-[15rem]"} z={"-z-0"}/>
                    <img src={story.imageUrl}  className=' absolute w-[20rem]'/>
                    {/* <div className={` ${story.gradient} absolute h-[10rem] w-[10rem]`}></div> */}
                </div>) : 
                (<div className=' w-[45%] flex flex-col p-10 justify-center  gap-y-4' key={story.id}>
                    <Hieghlightedtext color={story.gradient} data={story.heading}/>
                    <p className=" text-richblack-300 font-inter text-[.8rem] ">{story.description1}</p>
                    <p className=" text-richblack-300 font-inter text-[.8rem] ">{story.description2}</p>
                </div>)
           ))
        }
    </div>
  )
}

export default FoundingStory