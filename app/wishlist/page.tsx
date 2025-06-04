"use client";
import { useState, useEffect } from "react";
// store
import { useAuth } from "@/stores/auth";
import { useWishList } from "@/stores/wishlist";
// service
import {
  fetchWishList,
  addWishItem,
  removeWishItem,
} from "@/services/wishlist";
// component
import ListItem from "@/components/common/listItem";
import { BookItem } from "@/types/main";

export default () => {
  const [userId, setUserId] = useState(null);
  const { session } = useAuth();
  const { list, setList } = useWishList();

  // use Effect
  useEffect(() => {
    if (session && session.user) {
      setUserId(session.user.id);
    }
  }, [session]);

  const fetchList = async (userId: string) => {
    const test: any = await fetchWishList(userId);
    setList(test);
  };

  const findBook = (book: BookItem) => {
    console.log("🚀 ~ findBook ~ list.includes(book):", list.includes(book));
    return list.includes(book);
  };

  useEffect(() => {
    if (userId) {
      fetchList(userId);
    }
  }, [userId]);

  return (
    <div className="wishlist-warp">
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
        <p>찜 목록 내역이 없습니다.</p>
      )}
    </div>
  );
};
