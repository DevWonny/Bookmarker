"use client";
import { useState, useEffect } from "react";
// style
import "@/styles/components/modals/input.scss";

// interface
interface InputType {
  label: string; // Label + input Id
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  error = false,
}: InputType) {
  const [labelText, setLabelText] = useState("");

  useEffect(() => {
    if (label === "password") {
      setLabelText("pw");
    } else if (label === "passwordCheck") {
      setLabelText("pw 확인");
    } else {
      setLabelText(label);
    }
  }, [label]);
  return (
    <div className="input-container">
      <label htmlFor={label}>{labelText}</label>
      <input id={label} type={type} value={value} onChange={onChange} />
    </div>
  );
}
