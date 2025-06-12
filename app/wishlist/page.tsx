"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// store
import { useAuth } from "@/stores/auth";
import { useWishList } from "@/stores/wishlist";
// service
import { fetchWishList } from "@/services/wishlist";
import { supabase } from "@/lib/supabase";
// component
import ListItem from "@/components/common/listItem";
import { BookItem } from "@/types/main";
// style
import "@/styles/pages/wishlist.scss";
// skeleton ui
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// icon
import ErrorIcon from "@mui/icons-material/Error";

export default () => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuth();
  const { list, setList } = useWishList();
  const router = useRouter();

  const fetchList = async (userId: string) => {
    const data: any = await fetchWishList(userId);
    setList(data);
    setIsLoading(true);
  };

  const findBook = (book: BookItem) => {
    return list.includes(book);
  };

  // use Effect
  useEffect(() => {
    if (session && session.user) {
      setUserId(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    if (userId) {
      fetchList(userId);
    }
  }, [userId]);

  return isLoading ? (
    <div
      className={`wishlist-wrap ${list && list.length > 0 ? "" : "empty-wrap"}`}
    >
      {list && list.length > 0 ? (
        list.map((item) => (
          <ListItem
            type="wish"
            item={item}
            isWish={findBook(item)}
            key={`wish-list-item-key-${item.itemId}`}
          />
        ))
      ) : (
        <div className="empty-list flex h-full w-full flex flex-col items-center justify-center">
          <ErrorIcon className="empty-icon" />
          <p className="text-2xl font-bold">찜 목록 내역이 없습니다.</p>
        </div>
      )}
    </div>
  ) : (
    <SkeletonTheme baseColor="#e6c9ac" highlightColor="#fff8f1">
      <Skeleton height="100vh" width="100%" style={{ display: "block" }} />
    </SkeletonTheme>
  );
};
