import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthData {
  isGetUser: boolean,
  getDisplayName: string,
  session: any,
  setIsGetUser: (isGetUser: boolean) => void;
  setGetDisplayName: (getDisplayName: string) => void;
  setSession: (session: any) => void
}
export const useAuth = create<AuthData>()(
  devtools(
    (set) => ({
      isGetUser: false,
      getDisplayName: '',
      session: null,
      setIsGetUser: (isGetUser) => set({ isGetUser }),
      setGetDisplayName: (getDisplayName) => set({ getDisplayName }),
      setSession: (session) => set({ session }),
    })
  )
)