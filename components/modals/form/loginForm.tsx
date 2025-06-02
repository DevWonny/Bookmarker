"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
// store
import { useAuth } from "@/stores/auth";

// component
import Input from "@/components/modals/form/input";

// styles
import "@/styles/components/modals/loginForm.scss";

// type
type FormData = {
  email: string;
  password: string;
};

export default function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  // state
  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const { setIsGetUser, setGetDisplayName, setSession } = useAuth();

  useEffect(() => {
    if (idValue && pwValue) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [idValue, pwValue]);

  // function
  const onSignIn = async (formData: FormData) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("로그인 성공!");
      setSession(data.session);
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        setIsGetUser(true);
        const { user_metadata } = userData.user;
        if (user_metadata) {
          setGetDisplayName(user_metadata.displayName);
        }
      } else {
        setIsGetUser(false);
        setGetDisplayName("");
      }
      onSuccess();
    }
  };

  return (
    <form
      className="login-form-wrap flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        onSignIn({ email: idValue, password: pwValue });
      }}
    >
      <div className="form-container flex flex-col">
        <p className="form-title w-full text-center text-3xl">로그인</p>

        {/* //* ID */}
        <Input
          label="id"
          value={idValue}
          onChange={(e) => setIdValue(e.target.value)}
        />

        {/* //* PW */}
        <Input
          label="password"
          type="password"
          value={pwValue}
          onChange={(e) => setPwValue(e.target.value)}
        />
      </div>

      <button type="submit" className={`${isValid && "active"} text-2xl`}>
        로그인
      </button>
    </form>
  );
}
