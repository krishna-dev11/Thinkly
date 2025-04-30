// import React from "react";

// const plans = [
//   {
//     title: "Classic",
//     description: "Basic access to all class materials with limited features.",
//     color: "from-blue-500 to-blue-700",
//     buttonColor: "bg-blue-600 hover:bg-blue-700",
//   },
//   {
//     title: "Premium",
//     description: "Full access to live classes, materials, and mentorship.",
//     color: "from-yellow-500 to-yellow-600",
//     buttonColor: "bg-yellow-500 hover:bg-yellow-600 text-black",
//   },
// ];

// export default function StudentClassCards() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
//         {plans.map((plan) => (
//           <div
//             key={plan.title}
//             className={`rounded-2xl shadow-xl bg-gradient-to-br ${plan.color} text-white p-6 flex flex-col justify-between`}
//           >
//             <h2 className="text-2xl font-bold mb-2">{plan.title} Plan</h2>
//             <p className="mb-4">{plan.description}</p>
//             <button
//               onClick={() => alert(`Joining ${plan.title} class...`)}
//               className={`mt-auto px-4 py-2 rounded-xl font-semibold transition ${plan.buttonColor}`}
//             >
//               Join Class
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// 



import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function StudentClassCards() {

    const navigate = useNavigate()
    const {user} = useSelector(state=>state.profile)

  const liveClassUrl = "https://yourliveclasslink.com"; // 👈 Replace with your actual live class link

  return (
    <div onClick={()=>navigate(`/EnrolledCourses/${user?.firstName}`)} className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-md w-full text-center border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Join Live Class</h2>
        <p className="text-gray-600 mb-6">
          Click the button below to join your live class session.
        </p>
        <a
          href={liveClassUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition"
        >
          Join Now
        </a>
      </div>
    </div>
  );
}
