"use client";
import { useState, useEffect } from "react";
// import { }  from 'react-hook-form' // * 추후 적용 예정
// component
import Input from "@/components/modals/form/input";

export default function SignupForm() {
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

  return (
    <div className="signup-form-wrap flex flex-col">
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
        value={pwValue}
        onChange={(e) => {
          setPwValue(e.target.value);
        }}
      />

      {/* // * Password Check */}
      <Input
        label="passwordCheck"
        value={pwCheckValue}
        onChange={(e) => {
          setPwCheckValue(e.target.value);
        }}
      />

      <button type="submit" className={`${isValid} && active `}>
        회원가입
      </button>
    </div>
  );
}
