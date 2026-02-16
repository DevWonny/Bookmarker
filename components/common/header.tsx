"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
// service
import { BookSearch } from "@/services/book";
// store
import { useBookSearch } from "@/stores/bookSearch";
import { useAuth } from "@/stores/auth";
import { useWishList } from "@/stores/wishlist";
// style
import "@/styles/components/header.scss";
import { ChevronDown } from "lucide-react";
// Logo icon
import BookmarksRoundedIcon from "@mui/icons-material/BookmarksRounded";

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
  const searchFilterContainerRef = useRef<HTMLDivElement>(null);
  const isSearching = useRef(false);
  // state
  const [filter, setFilter] = useState("title");
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearchTypeClick, setIsSearchTypeClick] = useState(false);
  const { setKeyword, setBookList } = useBookSearch();
  const { session, setSession } = useAuth();
  const { list, setList } = useWishList();

  // function
  const onSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (search && search.trim()) {
        if (isSearching.current) return;
        isSearching.current = true;
        try {
          // 전역 관리 들어가야함!
          const searchList = await BookSearch(search, filter);
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

  const onSearchTypeClick = () => {
    if (isSearchTypeClick) {
      setIsSearchTypeClick(false);
    } else {
      setIsSearchTypeClick(true);
    }
  };

  const onFilterSelect = (type: string) => {
    setShowFilter(false);
    if (type === filter) {
      return;
    }
    setFilter(type);
  };

  // 검색 필터 영역 외 클릭 시
  const onClickOutSide = (event: MouseEvent) => {
    if (
      searchFilterContainerRef.current &&
      !searchFilterContainerRef.current.contains(event.target as Node)
    ) {
      setShowFilter(false);
    }
  };

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("로그아웃 실패! : ", error.message);
      return;
    }

    router.replace("/");
    setList([]);
    setSession(null);
  };

  const onWishClick = () => {
    if (session) {
      router.push("/wishlist");
    }
  };

  // useEffect
  useEffect(() => {
    setShowFilter(false);
    if (pathname !== "/bookResult") {
      setSearch("");
      setFilter("title");
      setKeyword("");
      setBookList([]);
    }
  }, [pathname]);

  useEffect(() => {
    document.addEventListener("click", onClickOutSide);
    return () => {
      document.removeEventListener("click", onClickOutSide);
    };
  }, []);

  return (
    <div className="bg-primary header-container flex justify-between items-center w-full">
      {/*  left -> 로고 + 서점 위치 페이지 버튼 + 검색  */}
      <div className="left-container flex h-full items-center">
        <Link
          href="/"
          className="logo flex items-center justify-center text-lg cursor-default"
        >
          <BookmarksRoundedIcon />
          BookMarker
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
          <div
            ref={searchFilterContainerRef}
            className="search-filter-container text-sm"
          >
            <button
              type="button"
              className="search-type-button flex items-center justify-center gap-[10px]"
              onClick={() => {
                showFilter ? setShowFilter(false) : setShowFilter(true);
                onSearchTypeClick();
              }}
            >
              {filter === "title" ? "제목" : "저자"}
              <ChevronDown
                width={20}
                height={20}
                className={`${isSearchTypeClick && "is-rotate"}`}
              />
            </button>

            {showFilter && (
              <ul className="search-filter-list">
                <li onClick={() => onFilterSelect("title")}>제목</li>
                <li onClick={() => onFilterSelect("author")}>저자</li>
              </ul>
            )}
          </div>

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
      <div className="right-container flex">
        {session ? (
          <div className="sign-in-container flex">
            <button className="wish-btn max-xl:text-sm" onClick={onWishClick}>
              찜 목록
            </button>
            <p className="display-name max-xl:text-sm">
              {session.user.user_metadata.displayName}
            </p>
            <button className="logout max-xl:text-sm" onClick={onLogout}>
              로그아웃
            </button>
          </div>
        ) : (
          <div className="default-container flex">
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
        )}
      </div>
    </div>
  );
}
