import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { setCurrectVideoUrl } from "../../../../Slices/Courses";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { UpdateProgress } from "../../../../Services.jsx/Operations/CoursesAPI";
import toast from "react-hot-toast";

const ViewLectureVideo = () => {
  const { CourseId, SectionId, SubSectionId } = useParams();
  const { courseDetails } = useSelector((state) => state.Category);
  const { videoUrl } = useSelector((state) => state.Course);
  const {token } = useSelector(state=>state.auth)
    const { user } = useSelector((state) => state.profile);
  

  // console.log(courseDetails)
  // console.log(user.coursesProgress[0].completedVideos.includes(SubSectionId))

  const playerRef = useRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [lectureName, setLectureName] = useState("");
  const [SectionName, setSectionName] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setlectureFirstvideoUrl = async () => {
      if (!courseDetails || !courseDetails.courseContent) return;

      const sectionIndex = courseDetails.courseContent.findIndex(
        (section) => section._id === SectionId
      );

      if (sectionIndex === -1) return;

      const section = courseDetails.courseContent[sectionIndex];
      setSectionName(section?.sectionName)
      const subsectionIndex = section.subSections.findIndex(
        (sub) => sub._id === SubSectionId
      );

      if (subsectionIndex === -1) return;

      const subsection = section.subSections[subsectionIndex];
      dispatch(setCurrectVideoUrl(subsection.videoUrl));
      setLectureName(subsection.title);
    };

    setlectureFirstvideoUrl();
  }, [location.pathname, CourseId, SectionId, SubSectionId]);

  const NextButton = () => {
    const sectionIndex = courseDetails.courseContent.findIndex(
      (section) => section._id === SectionId
    );
    if (sectionIndex === -1) return;

    const subsectionIndex = courseDetails.courseContent[sectionIndex].subSections.findIndex(
      (sub) => sub._id === SubSectionId
    );
    if (subsectionIndex === -1) return;

    const currentSection = courseDetails.courseContent[sectionIndex];

    // last subsection of this section
    if (subsectionIndex === currentSection.subSections.length - 1) {
      if (sectionIndex < courseDetails.courseContent.length - 1) {
        const nextSection = courseDetails.courseContent[sectionIndex + 1];
        const nextSubsection = nextSection.subSections[0];
        navigate(
          `/course/${CourseId}/section/${nextSection._id}/subSection/${nextSubsection._id}`
        );
      }
    } else {
      const nextSub = currentSection.subSections[subsectionIndex + 1];
      navigate(
        `/course/${CourseId}/section/${SectionId}/subSection/${nextSub._id}`
      );
    }
  };

  const PreviousButton = () => {
    const sectionIndex = courseDetails.courseContent.findIndex(
      (section) => section._id === SectionId
    );
    if (sectionIndex === -1) return;

    const subsectionIndex = courseDetails.courseContent[sectionIndex].subSections.findIndex(
      (sub) => sub._id === SubSectionId
    );
    if (subsectionIndex === -1) return;

    if (subsectionIndex === 0) {
      if (sectionIndex > 0) {
        const prevSection = courseDetails.courseContent[sectionIndex - 1];
        const prevSub = prevSection.subSections[prevSection.subSections.length - 1];
        navigate(
          `/course/${CourseId}/section/${prevSection._id}/subSection/${prevSub._id}`
        );
      }
    } else {
      const prevSub =
        courseDetails.courseContent[sectionIndex].subSections[subsectionIndex - 1];
      navigate(
        `/course/${CourseId}/section/${SectionId}/subSection/${prevSub._id}`
      );
    }
  };

  const IsNextVisible = () => {
    if (!courseDetails || !courseDetails.courseContent) return false;

    const sectionIndex = courseDetails.courseContent.findIndex(
      (section) => section._id === SectionId
    );
    if (sectionIndex === -1) return false;

    const subsectionIndex = courseDetails.courseContent[sectionIndex].subSections.findIndex(
      (sub) => sub._id === SubSectionId
    );
    if (subsectionIndex === -1) return false;

    return !(
      sectionIndex === courseDetails.courseContent.length - 1 &&
      subsectionIndex ===
        courseDetails.courseContent[sectionIndex].subSections.length - 1
    );
  };

  const IsPreviousVisible = () => {
    if (!courseDetails || !courseDetails.courseContent) return false;

    const sectionIndex = courseDetails.courseContent.findIndex(
      (section) => section._id === SectionId
    );
    if (sectionIndex === -1) return false;

    const subsectionIndex = courseDetails.courseContent[sectionIndex].subSections.findIndex(
      (sub) => sub._id === SubSectionId
    );
    if (subsectionIndex === -1) return false;

    return !(sectionIndex === 0 && subsectionIndex === 0);
  };

  const handleReWatchLecture = () => {
    if (playerRef.current) {
      playerRef.current.seek(0);
      setVideoEnded(false);
    }
  };

  const handleCompleteLecture = ()=>{

    if(user.coursesProgress[0].completedVideos.includes(SubSectionId)){
      toast.error("Already marked As Completed")
      return
    }

    if ( SubSectionId &&  CourseId){
         dispatch(UpdateProgress(CourseId , SubSectionId , token))
    }else{
      console.log("sectionId And SubsectionId is Missing")
    }

    if(IsNextVisible){
      NextButton()
    }
  }

  if (loading || !courseDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-y-5 h-full overflow-auto justify-center items-center border-t border-richblack-700 bg-white">
      <div className="flex justify-between mt-3 w-[90%]">
        <div c>
        <p className=" text-caribbeangreen-500">{SectionName}</p>
        <p className="text-xl font-semibold uppercase">{lectureName}</p>
        </div>
        <button className="px-3 py-2 rounded-md bg-yellow-50 flex gap-x-2 justify-center items-center"
        onClick={()=>handleCompleteLecture()}
        >
          Continue Learning
        </button>
      </div>

      <div className="h-[72%] w-[90%] bg-richblack-900 object-fill flex relative rounded-md overflow-hidden">
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoUrl}
        />
      </div>

      <div className="flex gap-x-2">
        <div className="flex gap-x-3">
          {IsPreviousVisible() && (
            <button
              className="px-3 py-2 rounded-md bg-yellow-50 flex gap-x-2 justify-center items-center"
              onClick={PreviousButton}
            >
              <FaArrowLeft /> Previous
            </button>
          )}

          {videoEnded && (
            <button
              className="px-3 py-2 rounded-md bg-yellow-50 flex gap-x-2 justify-center items-center"
              onClick={handleReWatchLecture}
            >
              Rewatch
            </button>
          )}

          {IsNextVisible() && (
            <button
              className="px-3 py-2 rounded-md bg-yellow-50 flex gap-x-2 justify-center items-center"
              onClick={NextButton}
            >
              Next <FaArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewLectureVideo;
