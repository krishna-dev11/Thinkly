import toast from "react-hot-toast";
import { catalogData } from "../apis";
import { setLoading } from "../../Slices/Auth";
import { apiConnector } from "../apiConnector";
import { setCategoryWiseCourses } from "../../Slices/Categories";

const { CATALOGPAGEDATA_API } = catalogData

export function GetCategoryWiseCoursesData( categoryId ) {

    return async (dispatch) => {
      console.log( categoryId)
      const toastId = toast.loading("Loading");
      dispatch(setLoading(true));
      try {
        const response = await apiConnector("POST" , CATALOGPAGEDATA_API , {
          categoryId
      })

        console.log(response.data.data)
        dispatch(setCategoryWiseCourses(response.data.data))
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