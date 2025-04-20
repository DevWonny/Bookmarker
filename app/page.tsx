"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// component
import ListItem from "@/components/common/listItem";
// style
import "@/styles/pages/main.scss";
// swiper style
import "swiper/css";

export default () => {
  const [listFilter, setListFilter] = useState("week");

  return (
    <div className="main-wrap w-full">
      <Swiper className="banner-container">
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
      </Swiper>

      <div className="rank-list-container w-full flex flex-col">
        <div className="btn-container flex justify-end">
          <button
            className={`week-btn ${listFilter === "week" && "active"}`}
            onClick={() => setListFilter("week")}
          >
            주간
          </button>
          <button
            className={`month-btn ${listFilter === "month" && "active"}`}
            onClick={() => setListFilter("month")}
          >
            월간
          </button>
          <button
            className={`year-btn ${listFilter === "year" && "active"}`}
            onClick={() => setListFilter("year")}
          >
            연간
          </button>
        </div>

        <div className="list-item-container">
          <ListItem />
          <ListItem />
        </div>
      </div>
    </div>
  );
};
