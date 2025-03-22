import toast from "react-hot-toast";
import { courseEndpoints, settingsEndpoints } from "../apis";
import { setLoading, setUser } from "../../Slices/Profile";
import { apiConnector } from "../apiConnector";
import { settoken } from "../../Slices/Auth";
import { setCategories } from "../../Slices/Categories";
import { setCourse, setStep } from "../../Slices/Courses";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;


const {
  COURSE_CATEGORIES_API,
  CREATE_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  DELETE_SECTION_API
} = courseEndpoints;


export function updateDisplayPicture(token , data) {
  return async (dispatch) => {
    console.log(token , data)
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API , data , {
        Authorisation: `Bearer ${token}`,
      })

      console.log(response.data)
      dispatch(setUser(response.data.User))
      localStorage.setItem("user" , JSON.stringify(response.data.User))
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Profile Image Save Successfully");
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function UpdateProfileDetails( token , data ) {
  return async (dispatch) => {
    console.log(data)
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, data , {
        Authorisation: `Bearer ${token}`,
      })



      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Personal Details Updated");
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}


export function ChangePassword( token , data ) {
  return async (dispatch) => {
    // console.log(data , token)
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", CHANGE_PASSWORD_API , data , {
        Authorisation: `Bearer ${token}`,
      })


      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password Updated Successfully");
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function DeleteAccountPermanentaly( token , data , navigate) {
  return async (dispatch) => {
    console.log(data , token)
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API , data , {
        Authorisation: `Bearer ${token}`,
      })


      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      localStorage.clear("token")
      dispatch(settoken(null))

      localStorage.clear("user")
      dispatch(setUser(null))

      toast.success("Account Deleted");

      navigate("/")
      
      window.location.reload()

    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function GetAllCategories() {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET" , COURSE_CATEGORIES_API )

      // console.log(response.data.data)

      dispatch(setCategories(response.data.data))

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

export function CreateNewCourse(FormData , token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST" , CREATE_COURSE_API , FormData ,
        {
          Authorisation: `Bearer ${token}`,
        }
       )
  // console.log(response.data)
       dispatch(setStep(2));
       dispatch(setCourse(response.data.data)) 

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("course Created Successfully")
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}


export function AddNewSection(FormData , token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST" , CREATE_SECTION_API , FormData ,
        {
          Authorisation: `Bearer ${token}`,
        }
       )

       dispatch(setCourse(response.data.data))

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Section Created Successfully")
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}


export function EditSection(FormData , token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST" , UPDATE_SECTION_API , FormData ,
        {
          Authorisation: `Bearer ${token}`,
        }
       )

       console.log(response.data)
       dispatch(setCourse(response.data.data))

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Section Updated Successfully")
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function DeleteSection(FormData , token) {
  console.log(FormData , token)
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("DELETE" , DELETE_SECTION_API , FormData ,
        {
          Authorisation: `Bearer ${token}`,
        }
       )

      //  console.log(response.data)
       dispatch(setCourse(response.data.data))

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Section Deleted Successfully")
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function AddNewSubSection(FormData , token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST" , CREATE_SUBSECTION_API , FormData ,
        {
          Authorisation: `Bearer ${token}`,
        }
       )

       console.log(response.data.data)
       dispatch(setCourse(response.data.data))

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("SubSection Created Successfully")
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}




