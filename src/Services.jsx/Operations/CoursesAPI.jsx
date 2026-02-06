import toast from "react-hot-toast";
import { catalogData, courseEndpoints, ratingsEndpoints } from "../apis";
import { setLoading } from "../../Slices/Auth";
import { apiConnector } from "../apiConnector";
import {
  setCategoryWiseCourses,
  setWholeCourseData,
} from "../../Slices/Categories";
import {
  // setBuyedCoursesDataForCard,
  setcourseComptetionPersentageData,
  setRatingAndReviewData,
  settotalCourseDuration,
  setUserBuyedCoursesDataForCard,
} from "../../Slices/Courses";
import { setUser } from "../../Slices/Profile";

const { CATALOGPAGEDATA_API } = catalogData;

const { CREATE_RATING_API, GET_ALL_RATING_AND_REVIEW } = ratingsEndpoints;

const {
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  GET_ALL_COURSES_DETAILS_FOR_CARD_VIEW,
  UPDATE_COURSE_PROGRESS_API,  GET_COURSE_PROGRESS_PERSENTAGE , GET_TOTAL_COURSE_DURATION
} = courseEndpoints;

export function GetCategoryWiseCoursesData(categoryId) {
  return async (dispatch) => {
    // console.log(categoryId);
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", CATALOGPAGEDATA_API, {
        categoryId,
      });

      // console.log(response.data.data);
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

      // console.log(response.data.data);
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
    // console.log(StudentId, token);
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

      // console.log(response.data.data);
      dispatch(setUserBuyedCoursesDataForCard(response.data.data));
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function CreateRating(courseId, rating, reviews, token) {
  return async (dispatch) => {
    // console.log( categoryId)
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        CREATE_RATING_API,
        {
          courseId,
          rating,
          reviews,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Rating Created");
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function GetAllRatingAndReview() {
  return async (dispatch) => {
    // console.log(StudentId, token);
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_ALL_RATING_AND_REVIEW);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // console.log(response.data.data);
      dispatch(setRatingAndReviewData(response.data.data));
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function UpdateProgress(courseId, subSectionId, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        UPDATE_COURSE_PROGRESS_API,
        {
          courseId,
          subSectionId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.data));
      localStorage.setItem("user", JSON.stringify(response.data.data));

      toast.success("Lecture Mark As Completed");
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function GetCourseCompletionPercentage(userId, courseId , token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        GET_COURSE_PROGRESS_PERSENTAGE,
        {
          userId,
          courseId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    //  console.log(response.data.data)
     dispatch(setcourseComptetionPersentageData(response.data.data));
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}


export function GetTotalCourseDuration( courseId , token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        GET_TOTAL_COURSE_DURATION,
        {
          courseId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    //  console.log(response.data.data)
     dispatch(settotalCourseDuration(response.data.data));
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
