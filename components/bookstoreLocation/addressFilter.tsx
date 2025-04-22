"use client";
import { useState, useEffect } from "react";
// style
import "@/styles/components/addressFilter.scss";

// type
type AddressType = {
  // * type === true : 시/도 , type === false : 시/구/군
  type: boolean;
};
export default function AddressFilter({ type }: AddressType) {
  const [filterValue, setFilterValue] = useState("");
  return (
    <select
      className="address-filter-container"
      value={filterValue}
      onChange={(e) => setFilterValue(e.target.value)}
    >
      {type ? (
        <option value="first">도 / 시 선택</option>
      ) : (
        <option value="second">시 / 구 / 군 선택</option>
      )}
    </select>
  );
}
