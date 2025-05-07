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
  const pathname = usePathname();

  const onModalClose = () => {
    setIsLoginClick(false);
    setIsSignupClick(false);
  };

  useEffect(() => {
    onModalClose();
  }, [pathname]);

  return (
    <div>
      <div
        className={`modal-container absolute w-full h-full ${
          isLoginClick || isSignupClick ? "active" : ""
        }`}
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
      </div>
    </div>
  );
}
