import toast from "react-hot-toast";
import { setLoading } from "../../Slices/Auth";
import { apiConnector } from "../apiConnector";
import { CartEndpoints } from "../apis";
import { setUser } from "../../Slices/Profile";

const { ADD_COURSE_IN_CART_API , REMOVED_COURSE_IN_CART_API , EMTYING_CART_API } = CartEndpoints

export function AddNewCouseInCart(CourseId , UserID , token , navigate) {
    return async (dispatch) => {
    //   console.log(StudentId, token);
      const toastId = toast.loading("Loading");
      dispatch(setLoading(true));
      try {
        const response = await apiConnector(
          "POST",
          ADD_COURSE_IN_CART_API,
          { CourseId  , UserID},
          {
            Authorization: `Bearer ${token}`,
          }
        );


        // console.log(response.data.data)
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        // console.log(response.data.data);


        dispatch(setUser(response.data.data));
        localStorage.setItem("user" , JSON.stringify(response.data.data))

        toast.success("Course Add in Cart")

        navigate("/dashboard/wishlist")
        

      } catch (error) {
        console.log(error);
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    };
  }

  export function RemovedCousefromTheCart(CourseId , UserID , token ) {
    return async (dispatch) => {
    //   console.log(StudentId, token);
      const toastId = toast.loading("Loading");
      dispatch(setLoading(true));
      try {
        const response = await apiConnector(
          "POST",
          REMOVED_COURSE_IN_CART_API,
          { CourseId  , UserID},
          {
            Authorization: `Bearer ${token}`,
          }
        );


        // console.log(response.data.data)
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        // console.log(response.data.data);

        localStorage.setItem("user" , JSON.stringify(response.data.data))
        dispatch(setUser(response.data.data));

        toast.success("Course Removed in Cart")

      } catch (error) {
        console.log(error);
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    };
  }

  export function EmtingCartAfterBuying(UserID , token ) {
    return async (dispatch) => {
      // console.log( "sabh badhiya");
      const toastId = toast.loading("Loading");
      dispatch(setLoading(true));
      try {
        const response = await apiConnector(
          "POST",
          EMTYING_CART_API,
          { UserID},
          {
            Authorization: `Bearer ${token}`,
          }
        );


        // console.log(response.data.data)
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        // console.log(response.data.data);

        localStorage.setItem("user" , JSON.stringify(response.data.data))
        dispatch(setUser(response.data.data));

        // toast.success("Course Removed in Cart")

      } catch (error) {
        console.log(error);
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    };
  }