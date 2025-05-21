// 서점 위치 페이지
"use client";
import { useEffect, useRef } from "react";
// component
import AddressFilter from "@/components/bookstoreLocation/addressFilter";
import LocationItem from "@/components/bookstoreLocation/locationItem";

// service
import { AddressTest } from "@/services/address";
// Map Initialize Date
import { InitLocation } from "@/utils/initLocation";

// style
import "@/styles/pages/bookstoreLocation.scss";

declare global {
  interface Window {
    kakao: any;
  }
}

export default () => {
  const MapRef = useRef(null);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=5ce6981d1edbff9b162ff07faef0c58f&autoload=false";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        initMap();
      });
    };
  }, []);

  const initMap = async () => {
    if (!MapRef.current) {
      return;
    }

    const { lat: initLat, lng: initLng } = await InitLocation();

    const container = MapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(initLat, initLng),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    const markerPosition = new window.kakao.maps.LatLng(initLat, initLng);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  };

  return (
    <div className="store-location-wrap flex w-full max-sm:flex-col justify-between">
      {/* //! disabled -> 위 필터 선택 아무것도 안되어 있을 경우 */}
      {/* // ! 추후 방법을 생각한 후에 구현 하기! */}
      {/* <div className="address-container flex flex-col">
        <AddressFilter type={true}></AddressFilter>
        <AddressFilter type={false}></AddressFilter>
        <div className="address-button-container flex">
          <button type="button" className="reset-btn">
            초기화
          </button>
          <button type="button" className="confirm-btn">
            확인
          </button>
        </div>
      </div> */}

      <div className="map-container w-full" ref={MapRef}></div>

      <div className="location-list-container">
        <LocationItem></LocationItem>
      </div>
    </div>
  );
};
