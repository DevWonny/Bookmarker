import { supabase } from "@/lib/supabase";
// store
// type
import { BookItem } from "@/types/main";

// * fetch Wish List
export const fetchWishList = async (userId: string) => {
  const res = await supabase.from('wishlist').select('*').eq('user_id', userId);
  console.log("🚀 ~ fetchWishList ~ res:", res)


  const { error, data } = res;
  if (error) {
    console.log('Fetch Wish List Error - ', error);
    return [];
  }

  return data;
}

// * add Wish Item
export const addWishItem = async (userId: string, bookItem: BookItem) => {
  console.log("🚀 ~ addWishItem ~ userId:", userId)
  // ! 추가 시 데이저 정리 해서 추가  
  const { author, cover, description, link, priceStandard, publisher, pubDate, title, bestDuration, bestRank, customerReviewRank, categoryName, itemId } = bookItem
  const req = await supabase.from('wishlist').insert({ user_id: userId, author, cover, description, link, priceStandard, publisher, pubDate, title, bestDuration, bestRank, customerReviewRank, categoryName, itemId: itemId });
  console.log("🚀 ~ addWishItem ~ req:", req)
  const { error } = req;
  if (error) {
    console.log('Add Wish Item Error - ', error);
    return;
  }
}

// * Remove Wish Item
export const removeWishItem = async (userId: string, itemId: string) => {
  const req = await supabase.from('wishlist').delete().match({ user_id: userId, itemId });
  const { error } = req;
  if (error) {
    console.log('Remove Wish Item Error - ', error)
    return;
  }
}