import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SearchState {
  keyword: string;
  bookList: any[];
  setKeyword: (keyword: string) => void;
  setBookList: (bookList: any[]) => void;
}

export const useBookSearch = create<SearchState>()(
  devtools(
    (set) => ({
      keyword: '',
      bookList: [],
      setKeyword: (keyword) => set({ keyword }),
      setBookList: (bookList) => set({ bookList })
    })
  ),
)

