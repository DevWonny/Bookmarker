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
  const { session } = useAuth();
  const { setList, list } = useWishList();
  // function
  const onConvertPrice = (price: string) => {
    const toNumberPrice = parseInt(price);
    return toNumberPrice.toLocaleString();
  };

  // image 태그 지우기
  const removeImgTag = (tag: string): string => {
    return tag.replace(/<img[^>]*>/gi, "");
  };

  // ! 추후 공통 Function 으로 분리
  const onFetchWishList = async (id: string) => {
    const fetch: any = await fetchWishList(id);
    setList(fetch);
  };

  const onWishButtonClick = async (item: BookItem) => {
    // ! 비로그인 상태에서 클릭하면 모달 뜨게 하기. -> 모달 오픈에 대한 관리를 zustand로 전역관리 하기
    if (session) {
      onFetchWishList(session.user.id);
      if (list.some((listItem) => listItem.itemId === item.itemId)) {
        console.log(item.itemId);
        await removeWishItem(session.user.id, item.itemId!);
        onFetchWishList(session.user.id);
      } else {
        console.log("add");
        await addWishItem(session.user.id, item);
        onFetchWishList(session.user.id);
      }
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
          item.author,
        )} | ${item.publisher} | ${dayjs(item.pubDate).format(
          "YYYY-MM-DD",
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
        <button
          className="wish-button text-base"
          onClick={() => onWishButtonClick(item)}
        >
          {isWish ? "해제" : "찜하기"}
        </button>
      </div>
    </div>
  );
}
