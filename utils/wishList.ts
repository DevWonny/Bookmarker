// service 
import { fetchWishList, addWishItem, removeWishItem } from "@/services/wishlist";
// type
import { BookItem } from "@/types/main";

// List Fetch
export const onFetchWishList = async (id: string) => {
  // * id -> user id
  const wishList: any = await fetchWishList(id);
  return wishList;
}

// Add Item
export const onAddWishItem = async (userId: string, item: BookItem) => {
  await addWishItem(userId, item);
  onFetchWishList(userId);
}

// Remove Item
export const onRemoveWishItem = async (userId: string, itemId: string) => {
  await removeWishItem(userId, itemId);
  onFetchWishList(userId);
}