import React from "react";
import ReactStars from "react-stars";

const RatingReviewCard = ({ data }) => {
  console.log(data)
  return (
    <div className="flex flex-col max-w-sm min-h-[13rem]  bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-md p-4 gap-y-4 text-white  transition-all duration-300 ease-in-out">

      {/* User Info */}
      <div className="flex items-center gap-x-4">
        <div className=" w-[2rem]">
        <img
          src={data?.user?.imageUrl}
          alt="avatar"
          className=" rounded-full border border-white"
        />
        </div>
        <div>
          <p className="text-lg font-semibold uppercase">
            {data?.user?.firstName} {data?.user?.lastName}
          </p>
          <p className="text-sm text-white/70">{data?.user?.email}</p>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-xs  text-white/90 leading-relaxed line-clamp-5">
        {data.reviews}
      </p>

      {/* Star Rating */}
      <div className="mt-auto flex gap-x-2 items-center">
      <span className=" text-yellow-5 font-semibold ">{data.rating}</span>
        <ReactStars
          count={5}
          edit={false}
          value={data.rating}
          size={28}
          color2={"#ffd700"}
        />
      </div>
    </div>
  );
};

export default RatingReviewCard;
