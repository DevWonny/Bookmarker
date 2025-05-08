"use client";
import { useState, useEffect } from "react";

// component
import Input from "@/components/modals/form/input";

// styles
import "@/styles/components/modals/loginForm.scss";

export default function LoginForm() {
  // state
  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (idValue && pwValue) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [idValue, pwValue]);

  return (
    <div className="login-form-wrap flex flex-col">
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
    </div>
  );
}
