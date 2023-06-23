import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useMediaQuery } from "@mui/material";
import FeatureCard from "./FeatureCard";

const Feature = ({ blogs }) => {
  const smallMQuery = useMediaQuery("(max-width: 767px)");

  return (
    <div className="p-5 border-b-[1px]">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={smallMQuery ? 1 : 3}
        autoplay
        loop
        className="mySwiper"
      >
        {blogs.map((blog) => (
          
            <SwiperSlide key={blog.id}>
              <FeatureCard blog={blog} />
            </SwiperSlide>
         
        ))}
      </Swiper>
    </div>
  );
};

export default Feature;
