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
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (type) {
      setFilterValue("도 / 시 선택");
    } else {
      setFilterValue("시 / 구 / 군 선택");
    }
  }, []);

  return (
    <div className="address-filter-container">
      <button
        type="button"
        className="filter-button"
        onClick={() => (showList ? setShowList(false) : setShowList(true))}
      >
        {filterValue}
      </button>
      {showList && (
        <ul className="filter-list">
          <li>추후 생성예정!</li>
        </ul>
      )}
    </div>
  );
}
