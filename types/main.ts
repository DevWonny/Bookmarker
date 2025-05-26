export interface BannerItem {
  author: string; // 저자
  cover: string; // 책 커버 이미지
  description: string; // 간략 설명
  link: string; // 알라딘 구입 페이지 이동
  priceStandard: string; // 정가
  publisher: string; // 출판사
  pubDate: string; // 출간 일자
  title: string; // 제목
}

export interface BookItem extends BannerItem {
  bestDuration: string;
  bestRank: string;
  customerReviewRank: string;
  categoryName: string
}