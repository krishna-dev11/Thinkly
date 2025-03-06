import React from 'react'
import { AnyOne_Anywhere } from '../../../data/aboutus-data'
import { Link } from 'react-router-dom'
import Hieghlightedtext from '../Home/Hieghlightedtext'

const Grey_whiteBox = () => {
  return (
    <div className={`grid grid-cols-4 grid-rows-2 w-[85%] mx-auto `}>
        {
            AnyOne_Anywhere.map((one)=>(
                one.id === 1 ? 
                (<div className={`flex flex-col gap-3 p-5 justify-center
                                  ${one.id === 1  && " col-span-2" }`}>
                    <p className="text-richblack-5 text-[1.5rem] md:text-[1.7rem] font-semibold font-inter leading-[2.5rem] md:leading-[2.75rem]">{one.heading1}</p>
                    <Hieghlightedtext data={one.heading2} color={one.heading2_gradient}/>
                    <p className=" text-richblack-300 font-inter text-[.8rem] w-[90%]">{one.description}</p>
                    <Link to={one.ButtonLink}><button className={`py-2 px-3 rounded-md bg-yellow-50 mt-5`}>Learn More</button></Link>
                </div>) :
                (<div className={`flex flex-col gap-10 p-5 justify-center hover:scale-105 hover:rounded-md duration-200
                                  ${one.id % 2 === 0 ?  " bg-richblack-600" : " bg-richblack-800" } 
                                  ${one.id === 4  && " col-start-2"}
                                  ${one.id === 1  && " col-span-2" }`}>
                    <div className=' flex flex-col '>
                      <p className="text-richblack-5  text-base font-semibold">{one.heading1}</p>
                      <p className="text-richblack-5  text-base font-semibold">{one.heading2}</p>
                    </div>
                    <p className=" text-richblack-300 font-inter text-[.8rem] ">{one.description}</p>
                </div>)
            ))
        }
    </div>
  )
}

export default Grey_whiteBox