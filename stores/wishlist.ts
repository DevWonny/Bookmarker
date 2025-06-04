import { create } from "zustand";
// type
import { BookItem } from "@/types/main";
import { devtools } from "zustand/middleware";

interface WishListData {
  list: BookItem[],
  setList: (list: BookItem[]) => void
}

export const useWishList = create<WishListData>()(
  devtools(set => ({
    list: [],
    setList: (list) => set({ list })
  }))
)