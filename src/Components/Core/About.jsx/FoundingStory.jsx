import React from 'react'
import {Founding} from "../../../data/aboutus-data"
import Hieghlightedtext from '../Home/Hieghlightedtext'

const FoundingStory = () => {
  return (
    <div className=' flex flex-wrap w-[85%]  mx-auto '>
        {
           Founding.map((story)=>(
            story.type === Image ? (
                <div className=' w-[45%] flex flex-col p-10 justify-center items-center ' key={story.id}>
                    <img src={story.imageUrl}  className=''/>
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