"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
// component
import ListItem from "@/components/common/listItem";

// style
import "@/styles/pages/main.scss";
// swiper style
import "swiper/css";

import { BookSearch } from "@/services/book";

export default () => {
  const [listFilter, setListFilter] = useState("week");

  const test = async () => {
    const res = await axios.get("/api/aladin", {
      params: { key: 1, query: "test11" },
    });
    console.log("🚀 ~ test ~ res:", res);
  };

  useEffect(() => {
    test();
  }, []);
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
          <ListItem type="rank" />
          <ListItem type="rank" />
        </div>
      </div>
    </div>
  );
};
