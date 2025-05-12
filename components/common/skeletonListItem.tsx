import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function SkeletonListItem() {
  return (
    <div className="skeleton-list-item flex flex-row">
      {/* Rank */}
      <div className="rank" style={{ height: "12.5rem", width: "6.25rem" }}>
        <SkeletonTheme baseColor="#e6c9ac" highlightColor="#fff8f1">
          <Skeleton height="100%" width="100%" style={{ display: "block" }} />
        </SkeletonTheme>
      </div>

      {/* Thumbnail */}
      <div
        className="thumbnail"
        style={{ height: "12.5rem", width: "12.5rem" }}
      >
        <SkeletonTheme baseColor="#e6c9ac" highlightColor="#fff8f1">
          <Skeleton width="100%" height="100%" style={{ display: "block" }} />
        </SkeletonTheme>
      </div>

      {/* Information */}
      <div
        className="information"
        style={{ width: "calc(100% - 18.75rem)", height: "12.5rem" }}
      >
        <SkeletonTheme baseColor="#e6c9ac" highlightColor="#fff8f1">
          <Skeleton height="100%" width="100%" style={{ display: "block" }} />
        </SkeletonTheme>
      </div>
    </div>
  );
}
