"use client";
import { useState, useEffect } from "react";
// component
import Input from "@/components/modals/form/input";

export default function SignupForm() {
  // state
  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [pwCheckValue, setPwCheckValue] = useState("");
  return (
    <div className="signup-form-wrap">
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
    </div>
  );
}
