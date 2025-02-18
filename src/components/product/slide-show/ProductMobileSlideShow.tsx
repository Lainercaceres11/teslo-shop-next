"use client";
import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import "./slideshow.css";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideShow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{ width: "100vw", height: "500px" }}
        navigation={true}
        pagination
        autoplay={{
          delay: 5000,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              alt={title}
              width={600}
              height={500}
              src={`/products/${image}`}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
