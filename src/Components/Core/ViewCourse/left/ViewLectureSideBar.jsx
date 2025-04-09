import ProgressBar from '@ramonak/react-progress-bar'
import React, { useEffect, useState } from 'react'
import { BiSolidCommentDetail } from "react-icons/bi";
import { CiShare1 } from "react-icons/ci";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GetWholeCourseDetails } from '../../../../Services.jsx/Operations/CoursesAPI';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosTv } from "react-icons/io";
import { LiaCertificateSolid } from "react-icons/lia";
import { setCurrectVideoUrl } from '../../../../Slices/Courses';

const ViewLectureSideBar = () => {

  const {CourseId , SectionId , SubSectionId} = useParams()

  const {courseDetails}  = useSelector(state=>state.Category) 

  const [loading , setloading] = useState(true)

  console.log(courseDetails)



  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(()=>{
    const getFullCourseDetail = async()=>{

      try{
        await dispatch(GetWholeCourseDetails(CourseId))
        if(courseDetails){
          setCurrectVideoUrl(courseDetails.courseContent[0].subSections[0].videoUrl)
         }
      }catch(error){
        console.log(error)
      }
      setloading(false)
    }
    getFullCourseDetail()
  },[location.pathname , CourseId , SectionId , SubSectionId])

    useEffect(()=>{
      const setlectureFirstvideoUrl = async()=>{
            const url = courseDetails.courseContent[0].subSections[0].videoUrl
            console.log(url)
            dispatch(setCurrectVideoUrl(url))
      }
      setlectureFirstvideoUrl()
    } , [location.pathname , CourseId , SectionId , SubSectionId])

  if(loading){
    return(
      <div>
        ...Loading
      </div>
    )
  }

  return (
    <div className=' py-10 px-2 flex flex-col' >

        <div className=' px-3'>
        <div className=' flex flex-col  gap-y-1 border-b border-richblack-700 py-2'>
        <ProgressBar
          completed={93}
          className=""
          height="10px"
          labelColor="white"
          labelSize="8px"
        />
        <p className=' mx-auto '><span className=' font-semibold'> 93% </span>Completed in <span className=' font-semibold'>88h 54m</span></p>
        </div>

        <div className=' flex justify-between items-center border-b py-2 border-richblack-700'>
          <div className=' flex gap-x-2 justify-center  items-center'>
          <BiSolidCommentDetail/>
          <p className='cursor-pointer font-semibold'>Course Discussions</p>
          </div>
          <CiShare1/>
        </div>
        </div>
        {/* sidebar data */}
        
        <div className=' py-3 rounded-md  '>
        {
          courseDetails.courseContent.map(section=>(
            <details className='  border-b border-richblack-700 py-3   ' key={section._id}>
                <summary className='list-none cursor-pointer flex gap-x-2 items-center'>
                <IoMdArrowDropdown/>
                  <p>{section.sectionName}</p>
                </summary>
                <div className=' flex flex-col gap-y-1  ml-4 py-2'>
                {
                   section.subSections.map((subsection)=>(
                     <div className={`flex px-2 gap-x-1 cursor-pointer items-center ${ subsection._id === SubSectionId ? " bg-yellow-800 rounded-md opacity-60  text-yellow-50" : "" }`} key={subsection._id}
                     onClick={()=>{
                      dispatch(setCurrectVideoUrl(subsection.videoUrl))
                      navigate(`/course/${CourseId}/section/${section._id}/subSection/${subsection._id}`)
                     }}
                     >
                     <IoIosTv/>
                     <p>{subsection.title}</p>
                     </div>
                   ))
                }
                </div>
            </details>
          ))
        }
        </div>

        {/* certificate */}
        <div className=' flex justify-between  place-items-end self-end  gap-x-2  px-3 bg-yellow-50 py-2 items-center rounded-full '>
          <LiaCertificateSolid  size={25}/>
          <p  className=' font-semibold'>Certificate</p>
        </div>

    </div>
  )
}

export default ViewLectureSideBar