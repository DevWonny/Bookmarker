"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// component
import Header from "@/components/common/header";
import AuthModal from "@/components/modals/authModal";

export default function LayoutClient({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // state
  const [isLoginClick, setIsLoginClick] = useState(false);
  const [isSignupClick, setIsSignupClick] = useState(false);
  const [isVisibleTopBtn, setIsVisibleTopBtn] = useState(false);
  const pathname = usePathname();

  const onModalClose = () => {
    setIsLoginClick(false);
    setIsSignupClick(false);
  };

  const onScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onVisibility = () => {
      if (window.scrollY > 50) {
        setIsVisibleTopBtn(true);
      } else {
        setIsVisibleTopBtn(false);
      }
    };

    window.addEventListener("scroll", onVisibility);
    return () => window.removeEventListener("scroll", onVisibility);
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
            Top
          </button>
        )}
      </div>
    </div>
  );
}
