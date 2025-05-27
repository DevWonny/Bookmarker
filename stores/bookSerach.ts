import { create } from 'zustand';

interface SearchState {
  keyword: string;
  bookList: any[];
  setKeyword: (keyword: string) => void;
  setBookList: (bookList: any[]) => void;
}

export const useBookSearch = create<SearchState>((set) => ({
  keyword: '',
  bookList: [],
  setKeyword: (keyword) => set({ keyword }),
  setBookList: (bookList) => set({ bookList })
}))