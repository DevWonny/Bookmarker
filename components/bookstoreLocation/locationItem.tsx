// style
import "@/styles/components/locationItem.scss";

// interface
interface LocationItemData {
  address_name: string;
  distance: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  id: string;
}

export default function LocationItem({ item }: { item: LocationItemData }) {
  console.log("🚀 ~ LocationItem ~ item:", item);

  const distanceConvert = () => {
    const { distance } = item;
  };

  return (
    <div className="location-item-container flex flex-col ">
      <div className="title-container flex items-center">
        <div className="icon"></div>
        <div className="title">{item.place_name}</div>
      </div>

      <div className="detail-container flex flex-col ">
        <p className="address">{item.road_address_name}</p>
        <p className="phone-number">{item.phone}</p>
        <p className="distance">{item.distance}</p>
      </div>
    </div>
  );
}
