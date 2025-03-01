import toast from "react-hot-toast"
import {setLoading} from  '../../Slices/Auth'
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"

const {
    SENDOTP_API 
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

            console.log("hi" , response.data)

            toast.success("OTP SEND Succefully")
            // navigate("/")
        }catch(error){
            console.log("error in sending OTP")
            console.log(error)
            toast.error("OTP Can't send")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)

    }
}