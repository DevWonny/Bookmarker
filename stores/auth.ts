import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthData {
  getDisplayName: string,
  session: any,
  setGetDisplayName: (getDisplayName: string) => void;
  setSession: (session: any) => void
}
export const useAuth = create<AuthData>()(
  devtools(
    (set) => ({
      getDisplayName: '',
      session: null,
      setGetDisplayName: (getDisplayName) => set({ getDisplayName }),
      setSession: (session) => set({ session }),
    })
  )
)