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

  useEffect(() => {
    if (session && session.user) {
      setUserId(session.user.id);
    }
  }, [session]);

  return (
    <div className="wishlist-warp">
      WishList
      {/* <ListItem type="wish"></ListItem> */}
    </div>
  );
};
