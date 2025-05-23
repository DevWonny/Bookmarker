// style
import "@/styles/components/locationItem.scss";

// interface
interface LocationItemData {
  addressName: string;
  distance: string;
  phone: string;
  placeName: string;
  placeUrl: string;
  roadAddress: string;
  id: string;
}

export default function LocationItem({ item }: { item: LocationItemData }) {
  console.log("🚀 ~ LocationItem ~ item:", item);

  return (
    <div className="location-item-container flex flex-col ">
      <div className="title-container flex items-center">
        <div className="icon"></div>
        <div className="title">우리 집</div>
      </div>

      <div className="detail-container flex flex-col ">
        <p className="address">신림로 1길 23, 456호</p>
        <p className="phone-number">010-1234-5678</p>
        <p className="distance">123.5 km</p>
      </div>
    </div>
  );
}
