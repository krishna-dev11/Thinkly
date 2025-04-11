import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CourseCard from "./CourseCard";
import { Pagination, Navigation, Keyboard, Autoplay } from "swiper/modules"; 
import "../../../App.css";

const CourseSlider = ({ data , speed , count}) => {  
  // console.log(data);

  return (
    <div>
      {data.length > 0 ? (
        <Swiper
          className=" "
          slidesPerView={ count ? count : 3}
          spaceBetween={10}
          loop={true}
          grabCursor={true}
          direction="horizontal" 
          pagination={{ clickable: true }}
          autoplay={{ 
            delay: speed ? speed : 2500, 
            disableOnInteraction: false,
          }}
          modules={[Pagination, Navigation, Keyboard , Autoplay ]} 
        >
          {data.map((course) => (
            <SwiperSlide key={course._id}>
              <CourseCard data={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="   bg-white/10 backdrop-blur-md  border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] py-10 rounded-md justify-center flex items-center text-3xl  font-inter font-semibold ">Courses Not Found</div>
      )}
    </div>
  );
};

export default CourseSlider;
