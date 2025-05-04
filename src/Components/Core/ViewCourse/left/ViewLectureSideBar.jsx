import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from "react";
import { BiSolidCommentDetail } from "react-icons/bi";
import { CiShare1 } from "react-icons/ci";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  GetCourseCompletionPercentage,
  GetWholeCourseDetails,
} from "../../../../Services.jsx/Operations/CoursesAPI";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosTv } from "react-icons/io";
import { LiaCertificateSolid } from "react-icons/lia";
import { setCurrectVideoUrl } from "../../../../Slices/Courses";
import { VscPreview } from "react-icons/vsc";
import ReviewModal from "../Right/ReviewModal";
import { SiTicktick } from "react-icons/si";
import CourseCertificateModal from "../Right/CourseCertificateModal";
// import CertificateRejected from "../Right/CertificateRejected";

const ViewLectureSideBar = () => {
  const { CourseId, SectionId, SubSectionId } = useParams();

  const { courseDetails } = useSelector((state) => state.Category);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseComptetionPersentageData } = useSelector(
    (state) => state.Course
  );

  console.log(courseDetails);

  const [loading, setloading] = useState(true);

  const [IsActiveReviewModal, setIsActiveReviewModal] = useState(null);
  const [IsActiveCertificateModal, setIsActiveCertificateModal] =
    useState(null);

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
    const getparticularCourseCompletionPercentage = async () => {
      try {
        await dispatch(
          GetCourseCompletionPercentage(user._id, CourseId, token)
        );
      } catch (error) {
        console.log(error);
      }
    };
    getparticularCourseCompletionPercentage();
  }, [location.pathname, CourseId, SectionId, SubSectionId]);

  useEffect(() => {
    const setlectureFirstvideoUrl = async () => {};
    setlectureFirstvideoUrl();
  }, [location.pathname, CourseId, SectionId, SubSectionId]);

  if (loading) {
    return <div>...Loading</div>;
  }

  return (
    <>
      <div className=" py-9 px-2 flex flex-col gap-y-3">
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
              btn1Onclick: () => setIsActiveReviewModal(null),
            })
          }
        >
          <VscPreview />
          Add Review
        </div>

        {courseDetails.TeachLive && (
          <div
            onClick={() => navigate(`/EnrolledCourses/${courseDetails._id}`)}
            className=" w-[95%] h-[2rem] mx-auto cursor-pointer flex justify-center items-center text-white rounded-md bg-caribbeangreen-400"
          >
            Start Learning Live
          </div>
        )}

        <div className=" px-3">
          <div className=" flex flex-col  gap-y-1 border-b border-richblack-700 py-2">
            <ProgressBar
              completed={courseComptetionPersentageData?.completionPercentage}
              className=""
              height="10px"
              labelColor="white"
              labelSize="8px"
            />
            <p className=" mx-auto ">
              <span className=" font-semibold">
                {" "}
                {`${courseComptetionPersentageData?.watchedDurationFormatted}`}{" "}
              </span>
              Completed Out of{" "}
              <span className=" font-semibold">
                {`${courseComptetionPersentageData?.totalDurationFormatted}`}{" "}
              </span>
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
                    {user.coursesProgress[0].completedVideos.includes(
                      subsection._id
                    ) ? (
                      <SiTicktick fill="#05bf8e" />
                    ) : (
                      <IoIosTv />
                    )}
                    <p className="">{subsection.title}</p>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>

        {/* certificate */}
        <div
          onClick={() =>
            setIsActiveCertificateModal({
              button1Text: "Cancel",
              btn1Onclick: () => setIsActiveCertificateModal(null),
              userName : user.firstName,
              instructorName : courseDetails.instructor.firstName,
              CourseName : courseDetails.courseName , 
              coursesProgressPercentage : courseComptetionPersentageData?.completionPercentage
            })
          }
          className=" flex justify-between  cursor-pointer place-items-end self-end  gap-x-2  px-3 bg-yellow-50 py-2 items-center rounded-full "
        >
          <LiaCertificateSolid size={25} />
          <p className=" font-semibold">Certificate</p>
        </div>
      </div>

      {IsActiveReviewModal && <ReviewModal data={IsActiveReviewModal} />}
      {IsActiveCertificateModal && <CourseCertificateModal data={IsActiveCertificateModal} />}
    </>
  );
};

export default ViewLectureSideBar;
