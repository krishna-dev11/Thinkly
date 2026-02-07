import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"


const TimeLine = () => {

    const timeline = [
        {
            Logo: Logo1,
            heading: "Leadership",
            Description:"Fully committed to the success company",
        },
        {
            Logo: Logo2,
            heading: "Responsibility",
            Description:"Students will always be our top priority",
        },
        {
            Logo: Logo3,
            heading: "Flexibility",
            Description:"The ability to switch is an important skills",
        },
        {
            Logo: Logo4,
            heading: "Solve the problem",
            Description:"Code your way to a solution",
        },
    ];

  return (
    <div className='flex flex-col gap-y-10 '>{
        timeline.map( (Singletimeline , index) => (
            <div className=' flex gap-x-6' key={index}>
                <div className=' shadow-sm shadow-richblack-100  h-[3rem] w-[3rem] rounded-full justify-center items-center flex'>
                <img src={Singletimeline.Logo} ></img>
                </div>
                <div>
                <div className=' text-lg font-semibold text-richblack-800 font-inter'>{Singletimeline.heading}</div>
                    <div className=' text-richblack-700 text-[.9rem] font-inter'>{Singletimeline.Description}</div>
                </div>
            </div>
        ))
    }</div>
  )
}

export default TimeLine