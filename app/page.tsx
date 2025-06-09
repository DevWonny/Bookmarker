"use client";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import dayjs from "dayjs";
// component
import ListItem from "@/components/common/listItem";
import SkeletonListItem from "@/components/common/skeletonListItem";
import BestsellerFilter from "@/components/main/bestsellerFilter";
// service
import { BookSearch, BookList } from "@/services/book";
// store
import { useWishList } from "@/stores/wishlist";
import { useAuth } from "@/stores/auth";
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
  const [bannerList, setBannerList] = useState<BannerItem[] | null>(null);
  const [bookList, setBookList] = useState<BookItem[] | null>(null);
  const [curPage, setCurPage] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const observeRef = useRef(null);
  const totalPage = useRef(10);
  const [filterYear, setFilterYear] = useState<string | null>(null);
  const [filterMonth, setFilterMonth] = useState<string | null>(null);
  const { list, setList } = useWishList();
  const { session } = useAuth();

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

  const findBook = (book: BookItem) => {
    // ! 새로 고침 시 표출 제대로 안됨! 확인 필요.
    if (list.length > 0) {
      return list.some((item) => item.itemId === book.itemId);
    }
  };

  useEffect(() => {
    onBannerList();
    onBookList();
    // Filter 초기화
    setFilterYear(() => dayjs().format("YYYY"));
    setFilterMonth(() => dayjs().format("MM"));
  }, []);

  useEffect(() => {
    if (session && session.user.id) {
      onFetchWishList(session.user.id);
    }
  }, [session]);

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
          <BestsellerFilter type="year" year={filterYear} />
          <BestsellerFilter type="month" month={filterMonth} />
          <BestsellerFilter type="week" year={filterYear} month={filterMonth} />
        </div>

        <div className="list-item-container">
          {bookList &&
          bookList.length > 0 &&
          bannerList &&
          bannerList.length > 0 ? (
            bookList.map((item, index) => (
              <ListItem
                key={`main-book-list-item-${index}`}
                type="rank"
                item={item}
                isWish={findBook(item)}
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
