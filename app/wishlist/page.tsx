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
  useEffect(() => {
    if (userId) {
      fetchList(userId);
    }
  }, [userId]);

  return (
    <div className="wishlist-warp">
      {list &&
        list.length > 0 &&
        list.map((item) => (
          <ListItem
            type="wish"
            item={item}
            key={`wish-list-item-key-${item.itemId}`}
          />
        ))}
      {/* <ListItem type="wish"></ListItem> */}
    </div>
  );
};
