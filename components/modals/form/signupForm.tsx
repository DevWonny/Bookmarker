"use client";
import { useState, useEffect } from "react";
// import { }  from 'react-hook-form' // * 추후 적용 예정
import { supabase } from "@/lib/supabase";
// component
import Input from "@/components/modals/form/input";

// style
import "@/styles/components/modals/signupForm.scss";

// type
type FormData = {
  email: string;
  password: string;
};

export default function SignupForm({ onSuccess }: { onSuccess: () => void }) {
  // state
  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [pwCheckValue, setPwCheckValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (idValue && pwValue && pwCheckValue) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [idValue, pwValue, pwCheckValue]);

  // function
  const onSignup = async (data: FormData) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) {
      alert(error.message);
    } else {
      alert("회원가입이 완료되었습니다.");
      onSuccess();
    }
  };

  return (
    <form
      className="signup-form-wrap flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        onSignup({ email: idValue, password: pwValue });
      }}
    >
      <div className="form-container flex flex-col">
        <p className="form-title w-full text-center text-3xl">회원가입</p>
        {/* // * ID */}
        <Input
          label="id"
          value={idValue}
          onChange={(e) => {
            setIdValue(e.target.value);
          }}
        />

        {/* // * Password */}
        <Input
          label="password"
          type="password"
          value={pwValue}
          onChange={(e) => {
            setPwValue(e.target.value);
          }}
        />

        {/* // * Password Check */}
        <Input
          label="passwordCheck"
          type="password"
          value={pwCheckValue}
          onChange={(e) => {
            setPwCheckValue(e.target.value);
          }}
        />
      </div>

      <button type="submit" className={`${isValid && "active"} text-2xl`}>
        회원가입
      </button>
    </form>
  );
}
