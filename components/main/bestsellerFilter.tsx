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
  const currentWeek = () => {
    const today = dayjs();
    const startOfMonth = today.startOf("month");
    const curIsoWeek = today.isoWeek();
    const startIsoWeek = startOfMonth.isoWeek();
    let weekOfMonth = curIsoWeek - startIsoWeek + 1;

    if (today.isoWeekYear() !== startOfMonth.isoWeekYear()) {
      weekOfMonth = curIsoWeek;
    }

    return weekOfMonth;
  };

  // 해당 월의 전체 주차 계산
  const allMonthWeek = () => {
    const date = dayjs("2024-06");
    const startOfMonth = date.startOf("month");
    const endOfMonth = date.endOf("month");

    let startWeek = startOfMonth.isoWeek();
    let endWeek = endOfMonth.isoWeek();

    if (startOfMonth.isoWeekYear() !== endOfMonth.isoWeekYear()) {
      const lastWeekOfYear = dayjs(
        `${startOfMonth.isoWeekYear()}-12-31`
      ).isoWeek();
      endWeek = lastWeekOfYear + endWeek;
    }

    return endWeek - startWeek + 1;
  };

  useEffect(() => {
    if (type === "year") {
      const todayYear = dayjs().format("YYYY");
      setFilterValue(todayYear);
    } else if (type === "month") {
      const todayMonth = dayjs().format("MM");
      setFilterValue(todayMonth);
    } else if (type === "week") {
      setFilterValue(currentWeek);
      allMonthWeek();
    }
  }, []);

  return (
    <div className="bestseller-filter-container">
      <p>{filterValue}</p>
    </div>
  );
}
