"use client";
import { useState, useEffect } from "react";

// component
import Header from "@/components/common/header";
import AuthModal from "@/components/modals/authModal";

export default function LayoutClient({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // state
  const [isLoginClick, setIsLoginClick] = useState(false);
  const [isSignupClick, setIsSignupClick] = useState(false);

  const onModalClose = () => {
    setIsLoginClick(false);
    setIsSignupClick(false);
  };

  return (
    <div>
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
      <AuthModal
        isLoginShow={isLoginClick}
        isSignupShow={isSignupClick}
        onCloseClick={onModalClose}
      />
      {children}
    </div>
  );
}
