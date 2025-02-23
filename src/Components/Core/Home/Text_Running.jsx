import React from 'react'
import Hieghlightedtext from "./Hieghlightedtext"
import { FaLongArrowAltRight } from "react-icons/fa"
import BlackYellowButton from "./BlackYellowButton"
import { TypeAnimation } from 'react-type-animation';

const Text_Running = ({textpart1data , gradienttextdata , textpart2data , smalltext , yellowButtondata , blackbuttondata , flex_type , code }) => {
  return (
    <div className={`w-[85%] flex  ${flex_type}  h-[18rem] mx-auto mt-10`}>

      {/* text-button part */}
      <div className='h-full w-[50%]   flex  flex-col gap-y-3 p-10 '>
           
           <div className='  flex flex-col '>
             <div className='flex items-baseline gap-x-2'>
             <p className=' text-richblack-5 text-[2rem] font-inter font-600 leading-[2.75rem]'>{textpart1data}</p>
             <Hieghlightedtext color={"bg-gradient-to-br from-[#0093E9] to-[#80D0C7] bg-clip-text text-transparent text-[2.23rem] font-inter  leading-[2.75rem]"} data={gradienttextdata}/>
             </div>
             <p className=' text-richblack-5 text-[2rem] font-inter font-600 leading-[2.75rem]'>{textpart2data}</p>   
           </div>

           <p className=' text-richblack-300 font-inter text-[.8rem] '>{smalltext}</p>
     
           <div className=''>
           <BlackYellowButton buttonData1={yellowButtondata}  buttoncolor1={`bg-yellow-50`}   buttonData2={blackbuttondata}  buttoncolor2={`bg-richblack-800`}/>
           </div>
    
    </div>
    
      {/* Running code part */}
      <div className=' flex  w-[47%] h-full border border-t-white border-l-white bg-richblack-[#111E32]'>
         <div className=' h-full w-[8%] flex flex-col gap-y-[.01rem] justify-center items-center text-richblack-400 font-inter'>
            <p >1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
         </div>
         <div className=' font-semibold p-[.6rem] '>
         <TypeAnimation
            style={{ whiteSpace: 'pre-line', color:"white" , display: 'block' }}
            sequence={[ code , 1000, '']}
            cursor={true}
            repeat={Infinity}
            omitDeletionAnimation={true}
         />
        </div>
      </div>
      
    </div>
  )
}

export default Text_Running