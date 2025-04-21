// 도서 검색 결과 페이지
"use client";
import { useState } from "react";
// component
import ListItem from "@/components/common/listItem";
// style
import "@/styles/pages/bookResult.scss";

export default () => {
  // * 검색 결과 데이터가 있을 경우에는 리스트를, 없을 경우에는 문구 표출
  const [isData, setIsData] = useState(false);

  return (
    <div className="book-result-wrap">
      {isData && <ListItem />}

      {!isData && (
        <div className="warning-box flex flex-col">
          <div className="warning-icon"></div>
          <p className="warning-text">검색결과 없음</p>
        </div>
      )}
    </div>
  );
};
