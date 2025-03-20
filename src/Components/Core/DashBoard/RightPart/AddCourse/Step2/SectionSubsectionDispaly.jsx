import React from 'react'
import { useSelector } from 'react-redux'
import { CiLineHeight } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";

const SectionSubsectionDispaly = () => {

    const {course} = useSelector(state=>state.Course)

  return (
    <div className=' w-full bg-richblack-700 rounded-md flex flex-col'>
        {
            course.courseContent.map(section=>(
                <details className=' w-[90%] '>
                    <summary className='list-none'>
                        <div className=' flex justify-between px-2 ring-richblack-400'>
                            <div className=' flex gap-x-1 justify-center items-center'>
                            <CiLineHeight fill='#6e727f'/>
                            <p>{section.sectionName}</p>
                            </div>
                            <div className=' flex gap-x-1 justify-center items-center'>
                            <MdEdit fill='#6e727f'/>
                            <RiDeleteBinLine fill='#6e727f'/>
                            <p className=' text-richblack-400 text-lg font-semibold'>|</p>
                            <TiArrowSortedDown fill='#6e727f'/>
                            </div>
                        </div>
                    </summary>
                </details>
            ))
        }
    </div>
  )
}

export default SectionSubsectionDispaly