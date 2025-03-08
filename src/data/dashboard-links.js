import { ACCOUNT_TYPE } from "../Utilities/Constaints";
export const sidebarLinks = [
  {
    name: "My Profile",
    path: "/dashboard/my-profile",
    type:ACCOUNT_TYPE.STUDENT,
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
    path: "/dashboard/enrolled-courses",
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
];
