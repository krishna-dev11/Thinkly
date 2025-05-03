import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa"


const BlackYellowButton = ({buttonData1 ,  buttoncolor1  , buttonData2 ,  buttoncolor2 , arrowvisible}) => {
  return (
    <div className=' flex gap-x-5 '>
        <button 
         className={`py-2 px-3 rounded-md ${buttoncolor1} flex items-baseline gap-2 `}>
        <p>{buttonData1}</p>
        <FaLongArrowAltRight fill='#000814' className=' translate-y-[.1rem]'/>
        </button>
        <button className={`py-2 px-3 rounded-md ${buttoncolor2} text-white shadow-lg shadow-blue-900/30 backdrop-blur-md rounded-full border-r-[2px] border-b-[2px] border-white/20`}>{buttonData2}</button>
    </div>
  )
}

export default BlackYellowButton