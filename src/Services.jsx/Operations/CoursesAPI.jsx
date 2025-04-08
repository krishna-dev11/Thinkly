import toast from "react-hot-toast";
import { catalogData, courseEndpoints } from "../apis";
import { setLoading } from "../../Slices/Auth";
import { apiConnector } from "../apiConnector";
import {
  setCategoryWiseCourses,
  setWholeCourseData,
} from "../../Slices/Categories";
import {
  setBuyedCoursesDataForCard,
  setUserBuyedCoursesDataForCard,
} from "../../Slices/Courses";

const { CATALOGPAGEDATA_API } = catalogData;

const {
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  GET_ALL_COURSES_DETAILS_FOR_CARD_VIEW,
} = courseEndpoints;

export function GetCategoryWiseCoursesData(categoryId) {
  return async (dispatch) => {
    console.log(categoryId);
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", CATALOGPAGEDATA_API, {
        categoryId,
      });

      console.log(response.data.data);
      dispatch(setCategoryWiseCourses(response.data.data));
      // localStorage.setItem("CategoryCourses" , JSON.stringify(response.data.data))

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function GetWholeCourseDetails(courseId) {
  return async (dispatch) => {
    // console.log( categoryId)
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        GET_FULL_COURSE_DETAILS_AUTHENTICATED,
        {
          courseId,
        }
      );

      // console.log(response.data.data)
      dispatch(setWholeCourseData(response.data.data));
      // localStorage.setItem("CategoryCourses" , JSON.stringify(response.data.data))

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function GetBuyedCoursesDataOfStudentForCard(StudentId, token) {
  return async (dispatch) => {
    console.log(StudentId, token);
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        GET_ALL_COURSES_DETAILS_FOR_CARD_VIEW,
        { StudentId },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      console.log(response.data.data);
      dispatch(setUserBuyedCoursesDataForCard(response.data.data));
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
