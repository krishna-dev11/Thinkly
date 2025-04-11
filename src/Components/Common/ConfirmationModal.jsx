import React from "react";

const ConfirmationModal = ({data}) => {

  // console.log(data)

  return (
    <div className="fixed inset-0 z-[1000] grid justify-center items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className=" bg-richblack-800 px-14 py-6 rounded-md border border-richblack-500 flex flex-col items-start gap-y-4">
        <p className=" text-richblack-5 text-[1.7rem] font-semibold  ">
          {data.heading}
        </p>
        <p className=" text-richblack-300 font-inter  text-[.8rem] ">{data.text1}</p>
        <div className=" flex gap-x-3">
          <button className=" bg-yellow-50 px-3 py-2 rounded-md"
                  onClick={data.btn1Onclick}>{data.button1Text}</button>
          <button className="  bg-richblack-400 px-3 py-2 rounded-md"
                  onClick={data.btn2Onclick}
                 >{data.button2Text}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
