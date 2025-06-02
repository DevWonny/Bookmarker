import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthData {
  isGetUser: boolean,
  getDisplayName: string,
  setIsGetUser: (isGetUser: boolean) => void;
  setGetDisplayName: (getDisplayName: string) => void;
}
export const useAuth = create<AuthData>()(
  devtools(
    (set) => ({
      isGetUser: false,
      getDisplayName: '',
      setIsGetUser: (isGetUser) => set({ isGetUser }),
      setGetDisplayName: (getDisplayName) => set({ getDisplayName }),
    })
  )
)