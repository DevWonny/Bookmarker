"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
// store
import { useAuth } from "@/stores/auth";

// component
import Header from "@/components/common/header";
import AuthModal from "@/components/modals/authModal";
// icon
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";

export default function LayoutClient({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // state
  const [isLoginClick, setIsLoginClick] = useState(false);
  const [isSignupClick, setIsSignupClick] = useState(false);
  const [isVisibleTopBtn, setIsVisibleTopBtn] = useState(false);
  const pathname = usePathname();
  const { session, setSession } = useAuth();

  const onModalClose = () => {
    setIsLoginClick(false);
    setIsSignupClick(false);
  };

  const onScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onGetSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (data) {
      setSession(data.session);
    }
  };

  useEffect(() => {
    const onVisibility = () => {
      if (window.scrollY > 50) {
        setIsVisibleTopBtn(true);
      } else {
        setIsVisibleTopBtn(false);
      }
    };

    onGetSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    window.addEventListener("scroll", onVisibility);
    return () => {
      window.removeEventListener("scroll", onVisibility);
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    onModalClose();
  }, [pathname]);

  return (
    <div>
      <div
        className={`modal-container absolute w-full h-full ${
          isLoginClick || isSignupClick ? "active" : ""
        }`}
        onClick={onModalClose}
      >
        <AuthModal
          isLoginShow={isLoginClick}
          isSignupShow={isSignupClick}
          onCloseClick={onModalClose}
        />
      </div>
      <div
        className={`layout-container ${
          isLoginClick || isSignupClick ? "layout-disabled" : ""
        }`}
      >
        <Header
          onLoginClick={() => {
            setIsLoginClick(true);
            setIsSignupClick(false);
          }}
          onSignupClick={() => {
            setIsLoginClick(false);
            setIsSignupClick(true);
          }}
        />
        {children}

        {isVisibleTopBtn && (
          <button
            className="top-btn fixed"
            type="button"
            onClick={onScrollToTop}
          >
            <ArrowUpwardOutlinedIcon className="top-icon"></ArrowUpwardOutlinedIcon>
          </button>
        )}
      </div>
    </div>
  );
}
