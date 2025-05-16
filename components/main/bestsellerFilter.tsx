"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

interface FilterType {
  type: string; // year, month, week
}

export default function BestsellerFilter({ type }: FilterType) {
  const [filterValue, setFilterValue] = useState<number | string>("");
  const [showList, setShowList] = useState(false);

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
