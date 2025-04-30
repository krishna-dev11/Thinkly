import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../Utilities/Constaints";
import { useEffect } from "react";




export const sidebarLinks = [
  {
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "FaUser",
  },
  {
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "FaTachometerAlt",
  },
  {
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "FaTv",
  },
  {
    name: "Enrolled Courses",
    path: `/EnrolledCourses/active-Courses`,
    type: ACCOUNT_TYPE.STUDENT,
    icon: "FaBook"
  },
  {
    name: "Purchase History",
    path: "/dashboard/purchase-history",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "FaShoppingCart",
  },
  {
    name: "Wishlist",
    path: "/dashboard/wishlist",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "FaBookmark",
  },
  {
    name: "Courses",
    path: "/dashboard/courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "FaGraduationCap",
  },
  {
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "FaPlus",
  },
  {
    name: "Start Live",
    path: "/dashboard/StartLive",
    icon: "FaTv",
    type: ACCOUNT_TYPE.INSTRUCTOR,
  }
];


export const BuyedCoursessidebarLinks = [
  {
    name: "Active Courses",
    path: "/EnrolledCourses/active-Courses",
    icon: "FaBook",
  },
  {
    name: "Bookmarks",
    path: "/EnrolledCourses/book-marks",
    icon: "FaBookmark",
  },
  {
    name: "Community",
    path: "/EnrolledCourses/community",
    icon: "FaRegComments",
  },
  {
    name: "Join Live",
    path: "/EnrolledCourses/EnterRoom",
    icon: "FaTv",
  }
];
