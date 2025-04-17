import Link from "next/link";
// style
import "@/styles/components/header.scss";

export default function Header() {
  return (
    <div className="bg-primary header-container w-full flex justify-between items-center">
      {/*  left -> 로고 + 서점 위치 페이지 버튼 + 검색  */}
      <div className="left-container flex h-full items-center">
        <div className="logo flex items-center justify-center text-lg cursor-default">
          Logo
        </div>
        <Link href="/" className="store-location-btn text-lg">
          서점 위치
        </Link>
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
