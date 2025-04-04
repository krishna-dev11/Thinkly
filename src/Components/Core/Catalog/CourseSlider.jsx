import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CourseCard from "./CourseCard";
import { Pagination, Navigation, Keyboard, Autoplay } from "swiper/modules"; // ✅ Autoplay import kiya
import "../../../App.css";

const CourseSlider = ({ data }) => {  // ✅ Props ko correctly destructure kiya
  console.log(data);

  return (
    <div>
      {data.length > 0 ? (
        <Swiper
          slidesPerView={4}
          loop={true}
          grabCursor={true}
          direction="horizontal" rtl={true}
          pagination={{ clickable: true }}
          autoplay={{ 
            delay: 2500, 
            disableOnInteraction: false, // ✅ User interact kare toh bhi autoplay chalta rahega
          }}
          modules={[Pagination, Navigation, Keyboard, Autoplay]} // ✅ Autoplay module add kiya
        >
          {data.map((course) => (
            <SwiperSlide key={course._id}>
              <CourseCard data={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div>Data nahi hai</div>
      )}
    </div>
  );
};

export default CourseSlider;
