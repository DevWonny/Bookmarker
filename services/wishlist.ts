import { supabase } from "@/lib/supabase";

// * fetch Wish List
export const fetchWishList = async (userId: string) => {
  const res = await supabase.from('wishlist').select('item_id').eq('user_id', userId);
  const { error, data } = res;
  if (error) {
    console.log('Fetch Wish List Error - ', error);
    return;
  }

  console.log("🚀 ~ fetchWishList ~ data:", data)
  return data;
}

// * add Wish Item
export const addWishItem = async (userId: string, itemId: string) => {
  // ! 추가 시 데이저 정리 해서 추가  

  const req = await supabase.from('wishlist').insert({ user_id: userId, item_id: itemId });
  const { error } = req;
  if (error) {
    console.log('Add Wish Item Error - ', error);
    return;
  }
}

// * Remove Wish Item
export const removeWishItem = async (userId: string, itemId: string) => {
  const req = await supabase.from('wishlist').delete().match({ user_id: userId, item_id: itemId });
  const { error } = req;
  if (error) {
    console.log('Remove Wish Item Error - ', error)
    return;
  }
}