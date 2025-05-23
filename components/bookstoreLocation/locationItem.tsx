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

interface LocationItemProps {
  item: LocationItemData;
  onOver: (id: string) => void;
  onLeave: (id: string) => void;
}

export default function LocationItem({
  item,
  onOver,
  onLeave,
}: LocationItemProps) {
  const distanceConvert = () => {
    const { distance } = item;
    const convertNum = parseInt(distance);
    return `${(convertNum / 1000).toFixed(2)} Km`;
  };

  return (
    <div
      className="location-item-container flex flex-col "
      onMouseOver={() => onOver(item.id)}
      onMouseLeave={() => onLeave(item.id)}
    >
      <div className="title-container flex items-center">
        <div className="icon"></div>
        <div className="title">{item.place_name}</div>
      </div>

      <div className="detail-container flex flex-col ">
        <p className="address">{item.road_address_name}</p>
        <p className="phone-number">{item.phone}</p>
        <p className="distance">{distanceConvert()}</p>
      </div>
    </div>
  );
}
