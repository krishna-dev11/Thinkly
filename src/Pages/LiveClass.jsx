import React from 'react'
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LiveClass = () => {

    const {RoomId} = useParams()
    const {user} = useSelector(state=>state.profile)
    const navigate = useNavigate()
    console.log(user)
    console.log(user)
    console.log(user)


    const MyMeeting = async(element)=>{
     const appId = 1856231876 ;
     const serverSecret = "74b75caae25310623d5e14b614d7d539";
     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        RoomId,
        Date.now().toString(),
        user.firstName  
     );
     const zp = ZegoUIKitPrebuilt.create(kitToken);
     zp.joinRoom({
        container : element,
        scenario:{
            mode:ZegoUIKitPrebuilt.VideoConference,
        }
     })
    }

  return (
    <div className=' justify-center flex items-center flex-col  gap-y-4  translate-y-3  min-h-screen  bg-white '>



        <div ref={MyMeeting} className='  w-full  '/>
  
        <button onClick={()=>{
            navigate("/EnrolledCourses/active-Courses")
            window.location.reload();
        }} className=' bg-yellow-5 px-3 py-2 rounded-md   ml-5'> Go Back To Dashboard </button>


    </div>
  )
}

export default LiveClass