import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// style
import "@/styles/components/skeletonLocationItem.scss";

export default function SkeletonLocationList() {
  return (
    <div className="skeleton-location-item">
      <SkeletonTheme baseColor="#e6c9ac" highlightColor="#fff8f1">
        <Skeleton height="100%" width="100%" style={{ display: "block" }} />
      </SkeletonTheme>
    </div>
  );
}
