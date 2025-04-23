"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// style
import "@/styles/components/header.scss";

export default function Header() {
  // state
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // url path check
  const pathname = usePathname();

  return (
    <div className="bg-primary header-container w-full flex justify-between items-center">
      {/*  left -> 로고 + 서점 위치 페이지 버튼 + 검색  */}
      <div className="left-container flex h-full items-center">
        <div className="logo flex items-center justify-center text-lg cursor-default">
          Logo
        </div>
        <Link
          href="/bookstoreLocation"
          className={`store-location-btn text-lg ${
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
            <option value="all">통합 검색</option>
            <option value="title">제목</option>
            <option value="author">저자</option>
          </select>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="검색어를 입력하세요."
          />
        </div>
      </div>

      {/* right -> 로그인 + 회원가입 버튼 + 찜목록 버튼 */}
      <div className="right-container">
        <div className="default-container flex">
          {/* //! 추후 분기 처리 필요, 로그인 시에는 해당 영역 안보이게 */}
          <button className="login-btn text-lg">로그인</button>
          <button className="signup-btn text-lg">회원가입</button>
        </div>
      </div>
    </div>
  );
}
