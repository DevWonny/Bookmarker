import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthData {
  isGetUser: boolean,
  setIsGetUser: (isGetUser: boolean) => void;
}
export const useAuth = create<AuthData>()(
  devtools(
    (set) => ({
      isGetUser: false,
      setIsGetUser: (isGetUser) => set({ isGetUser })
    })
  )
)