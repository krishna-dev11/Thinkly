import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Navigation, Keyboard, Autoplay } from "swiper/modules"; 
import "../../../App.css";
import { GetAllRatingAndReview } from "../../../Services.jsx/Operations/CoursesAPI";
import { useDispatch, useSelector } from "react-redux";
import RatingReviewCard from "./RatingReviewCard";
// import { Error } from "mongoose";
import "../../../Utilities/Loading.css"




const ReviwSlider = () => {

    const [loading , setloading ] = useState(true)

    const { RatingAndReviewData } = useSelector((state) => state.Course);


    const dispatch = useDispatch()

    useEffect(()=>{
       
        const getRAndRData = async()=>{
            try{
                await dispatch(GetAllRatingAndReview())
                
              }catch(error){
                 console.log(Error)
              }
              setloading(false)
        }

        getRAndRData()

    },[])

    if (loading ) {
        return <div>Loading...</div>;
      }

  return (
<div className="px-10 py-10 flex flex-col gap-y-10">
  <p className="text-3xl text-richblack-5 font-semibold  mx-auto">
    Reviews From Other Learners
  </p>

  <Swiper
    className="  py-10 "
    slidesPerView={3}
    spaceBetween={30}
    loop={true}
    grabCursor={true}
    centeredSlides={true}  
    direction="horizontal"
    // rtl={false}
    pagination={{ clickable: true }}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    modules={[Pagination, Navigation, Keyboard, Autoplay]}
  >
    {RatingAndReviewData.map((rr) => (
      <SwiperSlide key={rr._id}className="transition-all duration-500 ease-in-out swiper-slide-custom"
>
        <RatingReviewCard data={rr} />
      </SwiperSlide>
    ))}
  </Swiper>
</div>

  );
};

export default ReviwSlider;
