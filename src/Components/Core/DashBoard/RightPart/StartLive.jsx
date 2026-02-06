import React from "react";
// import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const StartLive = () => {
  const { CourseId } = useParams()
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.profile);

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
            onClick={() => navigate(`/dashboard/${CourseId}`)}
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
