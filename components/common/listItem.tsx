// * Main에서는 좌측에 순위가 나오고, 도서 검색 결과에서는 순위가 없는 상태, 찜 목록에서는 찜 해제 토글 버튼 표출
// * 그 외에는 동일
// type
import { BookItem } from "@/types/main";
// icon
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
// style
import "@/styles/components/listItem.scss";

// 좌측 영역 구분 Interface
type ListType = "rank" | "result" | "wish";
interface ListItemProps {
  type: ListType;
  item: BookItem;
}

export default function ListItem({ type, item }: ListItemProps) {
  console.log("🚀 ~ item:", item);
  return (
    <div className="item flex flex-row ">
      {type === "rank" && (
        <div className="rank h-full flex items-center justify-center">
          {item.bestRank}
        </div>
      )}

      {type === "wish" && (
        <div className="wish h-full flex items-center justify-center">
          <BookmarkOutlinedIcon className="active-mark-icon"></BookmarkOutlinedIcon>
          {/* <BookmarkBorderOutlinedIcon className="disabled-mark-icon"></BookmarkBorderOutlinedIcon> */}
        </div>
      )}

      <div className="thumbnail h-full flex items-center justify-center">
        <img src={item.cover} alt="Book Thumbnail" />
      </div>
      <div className="information h-full flex items-center justify-center">
        Book Information
      </div>
    </div>
  );
}
