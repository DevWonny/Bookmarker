// 서점 위치 페이지
// component
import AddressFilter from "@/components/bookstoreLocation/addressFilter";

// style
import "@/styles/pages/bookstoreLocation.scss";

export default () => {
  return (
    <div className="store-location-wrap flex w-100">
      <div className="address-container">
        <AddressFilter type={true}></AddressFilter>
        <AddressFilter type={false}></AddressFilter>
      </div>

      <div className="map-container">Map</div>

      <div className="location-list-container">List</div>
    </div>
  );
};
