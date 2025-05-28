"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// service
import { BookSearch } from "@/services/book";
// store
import { useBookSearch } from "@/stores/bookSearch";
// style
import "@/styles/components/header.scss";

// interface
interface HeaderType {
  onLoginClick?: (e: any) => void;
  onSignupClick?: (e: any) => void;
}

export default function Header({ onLoginClick, onSignupClick }: HeaderType) {
  // url path check
  const pathname = usePathname();
  // router
  const router = useRouter();
  // state
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const isSearching = useRef(false);
  const { setKeyword, setBookList } = useBookSearch();

  // function
  const onSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (search && search.trim()) {
        if (isSearching.current) return;
        isSearching.current = true;
        try {
          // 전역 관리 들어가야함!
          const searchList = await BookSearch(search);
          setKeyword(search);
          if (searchList && searchList.length > 0) {
            setBookList(searchList);
          } else {
            setBookList([]);
          }
        } finally {
          isSearching.current = false;
          if (pathname !== "/bookResult") {
            router.push("/bookResult");
          }
        }
      } else {
        return;
      }
    }
  };

  // useEffect
  useEffect(() => {
    if (pathname !== "/bookResult") {
      setSearch("");
      setKeyword("");
      setBookList([]);
    }
  }, [pathname]);

  return (
    <div className="bg-primary header-container flex justify-between items-center w-full">
      {/*  left -> 로고 + 서점 위치 페이지 버튼 + 검색  */}
      <div className="left-container flex h-full items-center">
        <Link
          href="/"
          className="logo flex items-center justify-center text-lg cursor-default"
        >
          Logo
        </Link>
        <Link
          href="/bookstoreLocation"
          className={`store-location-btn text-lg max-xl:text-base max-md:text-sm max-sm:text-xs ${
            pathname === "/bookstoreLocation" && "active"
          }`}
        >
          서점 위치
        </Link>

        <div className="search-container flex">
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            className="text-sm"
          >
            <option value="title">제목</option>
            <option value="author">저자</option>
          </select>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="검색어를 입력하세요."
            onKeyDown={onSearch}
          />
        </div>
      </div>

      {/* right -> 로그인 + 회원가입 버튼 + 찜목록 버튼 */}
      <div className="right-container">
        <div className="default-container flex">
          {/* //! 추후 분기 처리 필요, 로그인 시에는 해당 영역 안보이게 */}
          <button
            className="login-btn text-lg max-xl:text-base max-md:text-sm"
            onClick={onLoginClick}
          >
            로그인
          </button>
          <button
            className="signup-btn text-lg max-xl:text-base max-md:text-sm"
            onClick={onSignupClick}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
