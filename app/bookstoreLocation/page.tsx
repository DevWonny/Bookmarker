// 서점 위치 페이지
// component
import AddressFilter from "@/components/bookstoreLocation/addressFilter";
import LocationItem from "@/components/bookstoreLocation/locationItem";

// style
import "@/styles/pages/bookstoreLocation.scss";

export default () => {
  return (
    <div className="store-location-wrap flex w-full max-sm:flex-col justify-between">
      <div className="address-container flex flex-col">
        <AddressFilter type={true}></AddressFilter>
        <AddressFilter type={false}></AddressFilter>
        <div className="address-button-container flex">
          {/* //! disabled -> 위 필터 선택 아무것도 안되어 있을 경우 */}
          <button type="button" className="reset-btn">
            초기화
          </button>
          <button type="button" className="confirm-btn">
            확인
          </button>
        </div>
      </div>

      <div className="map-container w-full ">Map</div>

      <div className="location-list-container">
        <LocationItem></LocationItem>
      </div>
    </div>
  );
};
