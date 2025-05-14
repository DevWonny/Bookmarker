"use client";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// component
import ListItem from "@/components/common/listItem";
import SkeletonListItem from "@/components/common/skeletonListItem";
// service
import { BookSearch, BookList } from "@/services/book";
// type
import { BannerItem, BookItem } from "@/types/main";
// utils
import { RemoveParentheses, RemoveHyphen } from "@/utils/removeText";
// style
import "@/styles/pages/main.scss";
// skeleton ui
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// swiper style
import "swiper/css";

export default () => {
  // state
  const [listFilter, setListFilter] = useState("week");
  const [bannerList, setBannerList] = useState<BannerItem[] | null>(null);
  const [bookList, setBookList] = useState<BookItem[] | null>(null);
  const [curPage, setCurPage] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const observeRef = useRef(null);
  const totalPage = useRef(10);

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

  // 초기 10개 리스트 호출
  const onBookList = async () => {
    try {
      const list = await BookList("Bestseller");
      const { item, startIndex } = list;
      const convertIndex = parseInt(startIndex);
      setCurPage(convertIndex);
      if (item && item.length > 0) {
        setBookList(item);
      }
    } catch (err) {
      return err;
    }
  };

  // 이후 무한스크롤 리스트
  const onInfiniteBookList = async () => {
    try {
      const list = await BookList("Bestseller", curPage);
      const { item } = list;
      if (item && item.length > 0) {
        setBookList((prev: any) => [...prev, ...item]);
      }
    } catch (err) {
      console.log("Infinite Scroll Error - ", err);
      return err;
    }
  };

  useEffect(() => {
    onBannerList();
    onBookList();
  }, []);

  useEffect(() => {
    if (curPage === totalPage.current) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [curPage]);

  useEffect(() => {
    const observe = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurPage((prev) => prev && prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    if (observeRef.current) observe.observe(observeRef.current);

    return () => {
      if (observeRef.current) observe.unobserve(observeRef.current);
    };
  }, [hasMore]);

  useEffect(() => {
    if (!hasMore || curPage === 1) {
      return;
    }
    onInfiniteBookList();
  }, [curPage]);
  return (
    <div className="main-wrap w-full">
      {bannerList && bannerList.length > 0 ? (
        <Swiper className="banner-container">
          {bannerList.map((banner) => (
            <SwiperSlide>
              <img src={banner.cover} alt="Book Cover" />
              <div className="banner-info-container flex flex-col justify-center items-end">
                <h1 className="banner-title text-4xl">
                  {RemoveHyphen(banner.title)}
                </h1>
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
          {bookList && bookList.length > 0 ? (
            bookList.map((item, index) => (
              <ListItem
                key={`main-book-list-item-${index}`}
                type="rank"
                item={item}
              />
            ))
          ) : (
            <SkeletonListItem></SkeletonListItem>
          )}

          <div ref={observeRef} className="observe-container"></div>
        </div>
      </div>
    </div>
  );
};
