import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { setCurrectVideoUrl } from "../../../../Slices/Courses";

const ViewLectureVideo = () => {
  const { CourseId, SectionId, SubSectionId } = useParams();



  const { courseDetails } = useSelector((state) => state.Category);
  const playerRef = useRef();


  console.log(courseDetails);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { videoUrl } = useSelector((state) => state.Course);
  console.log(videoUrl);


  
  const [loading , setloading] = useState(false)

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
    <div className=" flex  h-full justify-center items-center border-t border-richblack-700   bg-white">
      <div className=" h-[80%] w-[90%] bg-richblack-900 rounded-md overflow-hidden">
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          // onEnded={() => setVideoEnded(true)}
          src={videoUrl}
        ></Player>
      </div>
    </div>
  );
};

export default ViewLectureVideo;
