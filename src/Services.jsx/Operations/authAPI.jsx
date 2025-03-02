import toast from "react-hot-toast"
import {setLoading} from  '../../Slices/Auth'
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"



const {
    SENDOTP_API ,
    SIGNUP_API ,
    LOGIN_API,
    RESETPASSTOKEN_API ,
    RESETPASSWORD_API
} = endpoints



export function sendOtp(email , navigate){

    return async (dispatch)=>{

        const toastId = toast.loading("loading...")
        dispatch(setLoading(true))
        
        try{
            const response =  apiConnector("POST" , SENDOTP_API , {
                email:email ,
                checkUserPresent : true
            } )

            // console.log("hi" , response.data)

            toast.success("OTP SEND Succefully")
            navigate("/enterOtp")
        }catch(error){
            console.log("error in sending OTP")
            console.log(error)
            toast.error("OTP Can't send")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)

    }
}

export function signUp(firstName , lastName, email , password, confirmPassword, accountType, otp , navigate){
    return async (dispatch)=>{
        const toastId = toast.loading("loading...")
        dispatch(setLoading(true))
        
        try{

            const response = await apiConnector("POST" , SIGNUP_API , {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                otp
            })

            console.log("hiiiiiibyeeee" , firstName , lastName, email , password, confirmPassword, accountType , otp)


            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("SignUp Successfull")
            navigate('/login')

        }catch(error){

            console.log(error)
            console.log("eror in SignUp")

        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function setLogin(email , password , navigate){
    return async (dispatch)=>{
        
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{

            const response = await apiConnector("POST" , LOGIN_API , {
                email, 
                password
            })

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Login")
            navigate("/")

        }catch(error){
             console.log(error)
             console.log("error in Login")
             toast.error("login failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        
    }
}

export function sendTokenLink(email , navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading")
        dispatch( setLoading(true))
        try{

            const response = await apiConnector("POST" , RESETPASSTOKEN_API , {
                email
            } )

            if(!response){
                navigate("/resendToken")
            }

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Check Email")

        }catch(error){
           console.log("unable to send Token Email")
           console.log(error)   
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function forgotPassword( password , confirmedPassword , token , navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading")
        dispatch( setLoading(true))
        try{

            const response = await apiConnector("POST" , RESETPASSWORD_API , {
                password ,
                confirmedPassword,
                token
            } )


            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Password Update successfully")
            navigate("/login")


        }catch(error){
           console.log("unable to update password")
           console.log(error)   
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}