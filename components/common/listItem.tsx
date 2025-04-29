// * Main에서는 좌측에 순위가 나오고, 도서 검색 결과에서는 순위가 없는 상태, 찜 목록에서는 찜 해제 토글 버튼 표출
// * 그 외에는 동일

// style
import "@/styles/components/listItem.scss";

// 좌측 영역 구분 Interface
type ListType = "rank" | "result" | "wish";
interface ListItemProps {
  type: ListType;
}

export default function ListItem({ type }: ListItemProps) {
  return (
    <div className="item flex flex-row ">
      {type === "rank" && (
        <div className="rank h-full flex items-center justify-center">1</div>
      )}

      {type === "wish" && (
        <div className="wish h-full flex items-center justify-center">Wish</div>
      )}

      <div className="thumbnail h-full flex items-center justify-center">
        Thumbnail
      </div>
      <div className="information h-full flex items-center justify-center">
        Book Information
      </div>
    </div>
  );
}
