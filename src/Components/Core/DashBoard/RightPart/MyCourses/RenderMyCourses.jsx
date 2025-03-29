import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteInstructorCourses,
  FetchInstructorsAllCourses,
} from "../../../../../Services.jsx/Operations/DashBoard";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FaClock } from "react-icons/fa6";
import { SiTicktick } from "react-icons/si";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import ConfirmationModal from "../../../../Common/ConfirmationModal";
import { setCourse, setEditCourse, setStep } from "../../../../../Slices/Courses";
import { useNavigate } from "react-router-dom";

const RenderMyCourses = () => {
  const [deleteModal, setDeleteAccountModelActiveData] = useState(null);
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  console.log(user._id);

  const dispatch = useDispatch();

  useEffect(() => {
    const getInstructorsAllCourses = () => {
      dispatch(FetchInstructorsAllCourses(user._id, token));
    };

    getInstructorsAllCourses();

    console.log(user);
  }, []);

  const DeleteCourse = (InstructorId, CourseId) => {
    console.log(InstructorId, CourseId);
    try {
      dispatch(DeleteInstructorCourses(InstructorId, CourseId, token));
      setDeleteAccountModelActiveData(null);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCourse = (course) => {
    console.log(course)
    try {
      dispatch(setEditCourse(true))
      dispatch(setCourse(course))
      dispatch(setStep(1))
      navigate("/dashboard/edit-course");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <div className=" border border-richblack-700  rounded-md">
        <Table>
          <Thead>
            <Tr>
              <Th>COURSES</Th>
              <Th>DURATION</Th>
              <Th>PRICE</Th>
              <Th>ACTIONS</Th>
            </Tr>
          </Thead>

          <Tbody>
            {user.courses.length > 0 ? (
              user.courses.map((course) => (
                <tr key={course._id}>
                  <td className=" flex gap-x-3">
                    <img
                      src={course.thumbnail}
                      className=" w-[10rem] h-[5rem]"
                    />
                    <div className=" flex flex-col gap-y-1 text-richblack-5">
                      <p>{course.courseName}</p>
                      <p>{course.courseDescription}</p>
                      <p>{course.createdAt}</p>
                      <div
                        className={` uppercase ${
                          course.status === "Draft"
                            ? " text-pink-100"
                            : " text-yellow-50"
                        } flex gap-x-2 items-baseline px-3 py-2 rounded-full `}
                      >
                        {course.status === "Draft" ? (
                          <FaClock fill="#f37290" />
                        ) : (
                          <SiTicktick fill="#ffd60a" />
                        )}
                        <p>{course.status}</p>
                      </div>
                    </div>
                  </td>
                  <td className=" text-richblack-5">1h 20min</td>
                  <td className=" text-richblack-5">{course.price}</td>
                  <td className=" flex gap-x-2">
                    <MdEdit fill="#f1f2ff" onClick={() => updateCourse(course)} />
                    <RiDeleteBin6Line
                      fill="#f1f2ff"
                      onClick={() =>
                        setDeleteAccountModelActiveData({
                          heading: "Please Rethink again ?",
                          text1:
                            "You are on the way of Deleting your Course Permanentaly .",
                          button1Text: "Delete",
                          button2Text: "Cancel",
                          btn1Onclick: () =>
                            DeleteCourse(course.instructor, course._id),
                          btn2Onclick: () =>
                            setDeleteAccountModelActiveData(null),
                        })
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <div className=" text-richblack-5">Course Not Found </div>
            )}
          </Tbody>
        </Table>
      </div>

      {deleteModal && <ConfirmationModal data={deleteModal} />}
    </>
  );
};

export default RenderMyCourses;
