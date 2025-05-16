"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import "dayjs/locale/ko";
// dayjs
dayjs.extend(isoWeek);
dayjs.locale("ko");

interface FilterType {
  type: string; // year, month, week
}

export default function BestsellerFilter({ type }: FilterType) {
  const [filterValue, setFilterValue] = useState<number | string>("");
  const [showList, setShowList] = useState(false);

  // 현재 주차 계산 로직

  // 해당 월의 전체 주차 계산 로직

  useEffect(() => {
    if (type === "year") {
      const todayYear = dayjs().format("YYYY");
      setFilterValue(todayYear);
    } else if (type === "month") {
      const todayMonth = dayjs().format("MM");
      setFilterValue(todayMonth);
    } else if (type === "week") {
      const todayWeek = dayjs().isoWeek();
      console.log("🚀 ~ useEffect ~ todayWeek:", todayWeek);
      setFilterValue(todayWeek);
    }
  }, []);

  return (
    <div className="bestseller-filter-container">
      <p>{filterValue}</p>
    </div>
  );
}
