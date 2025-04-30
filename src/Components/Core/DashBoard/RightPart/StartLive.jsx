// import React from 'react'

// const StartLive = () => {
//   return (
//     <div>StartLive</div>
//   )
// }

// export default StartLive


// import React from "react";
// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// // import StudentClassCards from "./StudentClassCards";

// const StartLive = () => {
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.profile);
//   // console.log(user)

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitSuccessful },
//   } = useForm();

// //   const StartLive = (event) => {
// //     console.log(event);
// //     navigate(`/EnterRoom/${user?.firstName}`);
// //   };

//   return (
//     <div className=" justify-center flex items-center h-full ">
//       {/* <form onSubmit={handleSubmit(HandleEnterRoom)}>
//         <label>
//           <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//             First Room Id<sup className="text-pink-200">*</sup>
//           </p>
//           <input
//             type="text"
//             placeholder="Enter Room Id"
//             name="EnterCode"
//             {...register("EnterCode", {
//               required: {
//                 value: true,
//                 message: "Please Enter Room Code Here",
//               },
//             })}
//             className="w-full rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5"
//             style={{
//               boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//             }}
//           />
//         </label>
//         <button type="submit" className="  bg-yellow-50">
//             EnterRoom
//         </button>
//       </form> */}

//       <div className="h-[30%] w-[60%] border border-richblack-700  rounded-md shadow-lg p-6 flex flex-col justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-richblack-5 mb-2">
//             Start Live Class
//           </h2>
//           <p className="text-richblack-200 mb-4">
//             Your live class is now active. Click below to join and start
//             learning!
//           </p>
//         </div>
 
//         <button
//         onClick={() => navigate(`/EnrolledCourses/${user?.firstName}`)}
//         className=" bg-blue-500  px-5 py-3 rounded-xl hover:scale-105  duration-150 "
//       > Go Live</button>

//       </div>


//     </div>
//   );
// };

// export default StartLive;



import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StartLive = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="flex justify-center items-center h-screen bg-richblack-900 px-4">
      <div className="w-full max-w-lg border border-richblack-700 rounded-xl shadow-xl p-8 bg-richblack-800 text-richblack-5 space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Instructor Live Panel</h2>
          <p className="text-richblack-300">
            Ready to go live? Click the button below to start your live class session and let students join in real-time.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => navigate(`/dashboard/${user?._id}`)}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-md hover:scale-105"
          >
            🚀 Start Live Class
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartLive;
