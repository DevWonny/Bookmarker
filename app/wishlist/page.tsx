"use client";
import { useState, useEffect } from "react";
// store
import { useAuth } from "@/stores/auth";
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

  // use Effect
  useEffect(() => {
    if (session && session.user) {
      setUserId(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    if (userId) {
      fetchWishList(userId);
    }
  }, [userId]);

  // function
  // test
  const onAddWishItem = async () => {
    if (userId) {
      await addWishItem(userId, "testItem2");
    }
  };

  const onRemove = async () => {
    if (userId) {
      await removeWishItem(userId, "testItem1");
      fetchWishList(userId);
    }
  };
  return (
    <div className="wishlist-warp">
      <button onClick={onAddWishItem}>Add Test</button>
      <button onClick={onRemove}>Remove Test</button>
      {/* <ListItem type="wish"></ListItem> */}
    </div>
  );
};
