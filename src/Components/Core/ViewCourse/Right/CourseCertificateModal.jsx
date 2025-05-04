import React from "react";
import { FormateDate } from "../../../../Utilities/FormateDate";
import { RxCross2 } from "react-icons/rx";

// button1Text: "Cancel",
// btn1Onclick: () => setIsActiveCertificateModal(null),
// userName : user.firstName,
// instructorName : courseDetails.instructor.firstName,
// CourseName : courseDetails.courseName , 
// coursesProgressPercentage : courseComptetionPersentageData?.completionPercentage

const CourseCertificateModal = ({data}) => {
  // console.log(data)
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm px-4">
        {
          (Number(data.coursesProgressPercentage) > 90) ? 
          (  <div className="bg-gradient-to-br  from-richblack-5 via-white to-richblack-25 text-gray-800 p-10 rounded-xl shadow-2xl max-w-4xl w-full border-[1.5px] border-gray-300 font-serif">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-3xl font-extrabold text-indigo-800 tracking-wide">Ktech</div>
          <div className="text-sm text-gray-600 tracking-widest uppercase">Certificate of Completion</div>
          <button className=" "
            onClick={data.btn1Onclick}>
            <RxCross2 size={25} className=" text-pink-300"/>
          </button>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-wide">CERTIFICATE OF COMPLETION</h1>
        <p className="text-md text-gray-600 italic mb-6">is proudly awarded to</p>

        {/* Recipient Name */}
        <h2 className="text-5xl text-yellow-700 font-semibold mb-6 underline underline-offset-8 decoration-yellow-500">
          {data.userName}
        </h2>

        {/* Course Details */}
        <p className="text-lg text-gray-700 leading-relaxed mb-10">
          For completing the 4.5-month comprehensive training in <br />
          <span className="font-semibold text-indigo-900">
            {data.CourseName}
          </span>{" "}
          <br />
          in the year <span className="font-semibold">2023</span>
        </p>

        {/* Footer Section */}
        <div className="flex justify-between items-end text-sm px-4">
          <div>
            <div className="text-gray-500">Serial No.</div>
            <div className="font-bold text-gray-800 tracking-widest">980GC5JO</div>
          </div>
          <div className="text-center">
            <div className="text-gray-500">Issue Date</div>
            <div className="font-bold text-gray-800">{FormateDate(Date.now())}</div>
          </div>
          <div className="text-right">
            <div className="text-xl italic font-medium text-indigo-800 tracking-wide">
              {data.instructorName}
            </div>
            <div className="text-xs text-gray-600">Mentor</div>
          </div>
        </div>
      </div>) : (<div className=" bg-white text-black px-3 py-2 rounded-md flex  gap-x-2"><button 
            onClick={data.btn1Onclick} className="  font-inter">
            <RxCross2 size={25} className=" text-pink-400"
            />
          </button>You Want to complete Course By Atleast 90% To Achive Certification</div>)
        }
    </div>
  );
};

export default CourseCertificateModal;
