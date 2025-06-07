// * Main에서는 좌측에 순위가 나오고, 도서 검색 결과에서는 순위가 없는 상태, 찜 목록에서는 찜 해제 토글 버튼 표출
// * 그 외에는 동일
// type
import { BookItem } from "@/types/main";
// store
import { useAuth } from "@/stores/auth";
import { useWishList } from "@/stores/wishlist";
// service
import {
  addWishItem,
  removeWishItem,
  fetchWishList,
} from "@/services/wishlist";
// util
import { RemoveHyphen, RemoveParentheses } from "@/utils/removeText";
import dayjs from "dayjs";
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
  isWish?: boolean;
}

export default function ListItem({
  type,
  item,
  isWish = false,
}: ListItemProps) {
  console.log("🚀 ~ item:", item);
  const { session } = useAuth();
  const { setList } = useWishList();
  // function
  const onConvertPrice = (price: string) => {
    const toNumberPrice = parseInt(price);
    return toNumberPrice.toLocaleString();
  };

  // image 태그 지우기
  const removeImgTag = (tag: string): string => {
    return tag.replace(/<img[^>]*>/gi, "");
  };

  const onTest = async (item: BookItem) => {
    if (type === "wish") {
      if (item && item.itemId) {
        await removeWishItem(session.user.id, item.itemId);
        const fetch: any = await fetchWishList(session.user.id);
        setList(fetch);
      }
    } else {
      await addWishItem(session.user.id, item);
    }
  };

  return (
    <div className="item flex flex-row ">
      {type === "rank" && (
        <div className="rank h-full flex items-center justify-center">
          {item.bestRank}
        </div>
      )}

      <div className="thumbnail h-full flex items-center justify-center">
        <img src={item.cover} alt="Book Thumbnail" />
      </div>

      <div className="information h-full flex flex-col items-start justify-center">
        {item.bestDuration && (
          <p className="best-duration text-xs">{item.bestDuration}</p>
        )}

        <h1 className="book-title text-lg font-bold">
          {RemoveHyphen(item.title)}
        </h1>
        <p className="book-publish text-sm font-medium">{`${RemoveParentheses(
          item.author
        )} | ${item.publisher} | ${dayjs(item.pubDate).format(
          "YYYY-MM-DD"
        )}`}</p>

        {type === "result" ? (
          <p
            className="book-description text-base font-normal"
            dangerouslySetInnerHTML={{ __html: removeImgTag(item.description) }}
          ></p>
        ) : (
          <p className="book-description text-base font-normal">
            {item.description}
          </p>
        )}
        <p className="book-category text-xs font-medium">{item.categoryName}</p>
      </div>

      <div className="wish-container h-full flex flex-col items-center justify-center">
        <p className="price text-base">
          {onConvertPrice(item.priceStandard)}원
        </p>
        <button className="wish-button text-base" onClick={() => onTest(item)}>
          {isWish ? "해제" : "찜하기"}
        </button>
      </div>
    </div>
  );
}
