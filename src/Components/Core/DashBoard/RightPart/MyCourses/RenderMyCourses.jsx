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
  const [deleteModal, setDeleteModal] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    if (user?._id && token) {
      dispatch(FetchInstructorsAllCourses(user._id, token));
    }
  }, [user?._id, token, dispatch]);

  const deleteCourse = (instructorId, courseId) => {
    dispatch(DeleteInstructorCourses(instructorId, courseId, token));
    setDeleteModal(null);
  };

  const updateCourse = (course) => {
    dispatch(setEditCourse(true));
    dispatch(setCourse(course));
    dispatch(setStep(1));
    navigate("/dashboard/edit-course");
  };

  return (
  <div className=" rounded-lg overflow-hidden">
        <div className="overflow-hidden rounded-md shadow-lg  p-4 ">
      <Table className="w-full text-left border border-richblack-700 rounded-md">
        <Thead className=" border border-richblack-700 rounded-md text-white ">
          <Tr>
            <Th className="p-3">COURSES</Th>
            <Th className="p-3">DURATION</Th>
            <Th className="p-3">PRICE</Th>
            <Th className="p-3">ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody >
          {user?.courses?.length > 0 ? (
            user.courses.map((course , index) => (
              <Tr key={index} className="border-b border-gray-700">
                <Td className="flex items-center gap-4 p-3">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="w-[10rem] h-full rounded-md object-cover"
                  />
                  <div className="text-white flex flex-col gap-y-2">
                    <p className="font-semibold text-lg">{course.courseName}</p>
                    <p className="text-sm text-gray-400">{course.courseDescription}</p>
                    <p className="text-xs text-gray-500">{course.createdAt}</p>
                    <span
                      className={`mt-2 px-3 py-1 rounded-full  text-sm font-medium flex self-start items-center  gap-2 ${
                        course.status === "Draft" ? "text-pink-400 bg-pink-900" : "text-yellow-50 bg-yellow-900"
                      }`}
                    >
                      {course.status === "Draft" ? <FaClock /> : <SiTicktick />}
                      <p>{course.status}</p>
                    </span>
                  </div>
                </Td>
                <Td className="p-3 text-white">1h 20min</Td>
                <Td className="p-3 text-white">${course.price}</Td>
                <Td className="p-3 flex gap-3 justify-center items-center -translate-y-10">
                  <MdEdit
                    className="cursor-pointer text-blue-400 hover:text-blue-100 text-xl"
                    onClick={() => updateCourse(course)}
                  />
                  <RiDeleteBin6Line
                    className="cursor-pointer text-pink-400 hover:text-pink-100 text-xl"
                    onClick={() =>
                      setDeleteModal({
                        heading: "Are you sure?",
                        text1: "This action is irreversible. Your course will be permanently deleted.",
                        button1Text: "Delete",
                        button2Text: "Cancel",
                        btn1Onclick: () => deleteCourse(course.instructor, course._id),
                        btn2Onclick: () => setDeleteModal(null),
                      })
                    }
                  />
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="4" className="p-5 text-center text-richblack-5">
                No Courses Found
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      {deleteModal && <ConfirmationModal data={deleteModal} />}
    </div>
  </div>
  );
};

export default RenderMyCourses;