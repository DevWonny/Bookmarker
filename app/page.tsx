"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// component
import ListItem from "@/components/common/listItem";
// service
import { BookSearch, BookList } from "@/services/book";
// type
import { BannerItem } from "@/types/main";
// style
import "@/styles/pages/main.scss";
// skeleton ui
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// swiper style
import "swiper/css";

export default () => {
  const [listFilter, setListFilter] = useState("week");
  const [bannerList, setBannerList] = useState<BannerItem[] | null>(null);

  const onBannerList = async () => {
    try {
      const list = await BookList("ItemNewSpecial");
      if (list && list.length > 0) {
        setBannerList(list);
      }
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    onBannerList();
  }, []);

  useEffect(() => {
    console.log("🚀 ~ bannerList:", bannerList);
  }, [bannerList]);

  return (
    <div className="main-wrap w-full">
      {bannerList && bannerList.length > 0 ? (
        <Swiper className="banner-container">
          {bannerList.map((banner) => (
            <SwiperSlide>
              <img src={banner.cover} alt="Book Cover" />
              <div className="banner-info-container flex flex-col justify-center items-end">
                <h1 className="banner-title text-4xl">{banner.title}</h1>
                <p className="banner-description text-lg">
                  {banner.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <SkeletonTheme baseColor="#e6c9ac" highlightColor="#fff8f1">
          <Skeleton height="25rem" width="100%" style={{ display: "block" }} />
        </SkeletonTheme>
      )}

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
