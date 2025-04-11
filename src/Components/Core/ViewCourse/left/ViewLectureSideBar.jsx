import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from "react";
import { BiSolidCommentDetail } from "react-icons/bi";
import { CiShare1 } from "react-icons/ci";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GetWholeCourseDetails } from "../../../../Services.jsx/Operations/CoursesAPI";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosTv } from "react-icons/io";
import { LiaCertificateSolid } from "react-icons/lia";
import { setCurrectVideoUrl } from "../../../../Slices/Courses";
import { VscPreview } from "react-icons/vsc";
import ReviewModal from "../Right/ReviewModal";
import { SiTicktick } from "react-icons/si";

const ViewLectureSideBar = () => {
  const { CourseId, SectionId, SubSectionId } = useParams();

  const { courseDetails } = useSelector((state) => state.Category);
  const { user } = useSelector((state) => state.profile);


  const [loading, setloading] = useState(true);

  // console.log(user.coursesProgress)
  // console.log(courseDetails)
  // console.log(user.coursesProgress[0].completedVideos.includes(SubSectionId))

  const [IsActiveReviewModal, setIsActiveReviewModal] = useState(null);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getFullCourseDetail = async () => {
      try {
        await dispatch(GetWholeCourseDetails(CourseId));
        if (courseDetails) {
          setCurrectVideoUrl(
            courseDetails.courseContent[0].subSections[0].videoUrl
          );
        }
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    };
    getFullCourseDetail();
  }, [location.pathname, CourseId, SectionId, SubSectionId]);

  useEffect(() => {
    const setlectureFirstvideoUrl = async () => {
      console.log(courseDetails)
      
      // const url = courseDetails.courseContent[0].subSections[0].videoUrl
      // dispatch(setCurrectVideoUrl(url));
    };
    setlectureFirstvideoUrl();
  }, [location.pathname, CourseId, SectionId, SubSectionId]);

  if (loading) {
    return <div>...Loading</div>;
  }

  return (
    <>
      <div className=" py-10 px-2 flex flex-col">
        <div
          className=" flex  cursor-pointer justify-between bottom-0  self-start   gap-x-2  px-3 bg-yellow-50 py-2 items-center rounded-full font-semibold "
          onClick={() =>
            setIsActiveReviewModal({
              // heading: "Please Rethink again ?",
              // text1:
              //   "You are on the way of Deleting your account Permanentaly .",
              button1Text: "Cancel",
              button2Text: "Save",
              // btn1Onclick: () =>
              //   dispatch(DeleteAccountPermanentaly(token, user.id, navigate)),
              btn1Onclick: () =>setIsActiveReviewModal(null),
            })
          }
        >
          <VscPreview />
          Add Review
        </div>

        <div className=" px-3">
          <div className=" flex flex-col  gap-y-1 border-b border-richblack-700 py-2">
            <ProgressBar
              completed={courseDetails.progressPercentage}
              className=""
              height="10px"
              labelColor="white"
              labelSize="8px"
            />
            <p className=" mx-auto ">
              <span className=" font-semibold"> {`${courseDetails.progressPercentage}`} </span>Completed in{" "}
              <span className=" font-semibold">{`${courseDetails.totalDuration}`} </span>
            </p>
          </div>

          <div className=" flex justify-between items-center border-b py-2 border-richblack-700">
            <div className=" flex gap-x-2 justify-center  items-center">
              <BiSolidCommentDetail />
              <p className="cursor-pointer font-semibold">Course Discussions</p>
            </div>
            <CiShare1 />
          </div>
        </div>
        {/* sidebar data */}

        <div className=" py-3 rounded-md  ">
          {courseDetails.courseContent.map((section) => (
            <details
              className="  border-b border-richblack-700 py-3   "
              key={section._id}
            >
              <summary className="list-none cursor-pointer flex gap-x-2 items-center">
                <IoMdArrowDropdown />
                <p>{section.sectionName}</p>
              </summary>
              <div className=" flex flex-col gap-y-1  ml-4 py-2">
                {section.subSections.map((subsection) => (
                  <div
                    className={`flex px-2 gap-x-2 cursor-pointer items-center ${
                      subsection._id === SubSectionId
                        ? " bg-yellow-800 rounded-md opacity-60  text-yellow-50"
                        : ""
                    }`}
                    key={subsection._id}
                    onClick={() => {
                      dispatch(setCurrectVideoUrl(subsection.videoUrl));
                      navigate(
                        `/course/${CourseId}/section/${section._id}/subSection/${subsection._id}`
                      );
                    }}
                  >
                    {/* <IoIosTv /> */}
                    {
                      user.coursesProgress[0].completedVideos.includes(subsection._id)  ? <SiTicktick fill="#05bf8e"/>  : <IoIosTv />
                    }
                    <p className="">{subsection.title}</p>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>

        {/* certificate */}
        <div className=" flex justify-between  place-items-end self-end  gap-x-2  px-3 bg-yellow-50 py-2 items-center rounded-full ">
          <LiaCertificateSolid size={25} />
          <p className=" font-semibold">Certificate</p>
        </div>
      </div>

      {IsActiveReviewModal && <ReviewModal data={IsActiveReviewModal} />}
    </>
  );
};

export default ViewLectureSideBar;
