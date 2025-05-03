"use client";
import { useState, useEffect } from "react";
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
