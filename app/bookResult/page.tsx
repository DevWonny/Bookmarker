// 도서 검색 결과 페이지
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// store
import { useBookSearch } from "@/stores/bookSearch";
// component
import ListItem from "@/components/common/listItem";
// type
import { BookItem } from "@/types/main";
// style
import "@/styles/pages/bookResult.scss";

export default () => {
  // * 검색 결과 데이터가 있을 경우에는 리스트를, 없을 경우에는 문구 표출
  const [isData, setIsData] = useState(false);
  const [itemList, setItemList] = useState<any>([]);
  // store state
  const { keyword, bookList } = useBookSearch();

  // useEffect
  useEffect(() => {
    if (bookList && bookList.length > 0) {
      setItemList(bookList);
      setIsData(true);
    } else {
      setItemList([]);
      setIsData(false);
    }
  }, [bookList]);

  return (
    <div
      className={`book-result-wrap ${
        !isData && "flex items-center justify-center h-screen"
      }`}
    >
      {isData &&
        itemList.length > 0 &&
        itemList.map((book: any, index: number) => (
          <ListItem
            key={`book-result-list-item-${index}`}
            type="result"
            item={book}
          />
        ))}

      {!isData && (
        <div className="warning-box flex flex-col items-center">
          <div className="warning-icon"></div>
          <p className="warning-text">
            {`검색 결과가 없습니다.\n검색어의 철자가 정확한지 다시 한 번 확인해주세요.`}
          </p>
        </div>
      )}
    </div>
  );
};
