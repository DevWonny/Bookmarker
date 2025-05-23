// 서점 위치 페이지
"use client";
import { useEffect, useRef, useState } from "react";
// component
import AddressFilter from "@/components/bookstoreLocation/addressFilter";
import LocationItem from "@/components/bookstoreLocation/locationItem";

// service
import { AddressTest } from "@/services/address";
// Map Initialize Date
import { InitLocation } from "@/utils/initLocation";

// style
import "@/styles/pages/bookstoreLocation.scss";

// interface
interface PlaceInfo {
  id: string;
  placeName: string;
  addressName: string;
  phone: string;
  distance: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default () => {
  // ref
  const MapRef = useRef(null);
  // state
  const [place, setPlace] = useState<PlaceInfo[]>([]);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=5ce6981d1edbff9b162ff07faef0c58f&autoload=false&libraries=services";
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        initMap();
      });
    };

    document.head.appendChild(script);
  }, []);

  const initMap = async () => {
    if (!MapRef.current) {
      return;
    }

    const { lat: initLat, lng: initLng } = await InitLocation();

    const container = MapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(initLat, initLng),
      level: 5,
      draggable: false,
    };

    const map = new window.kakao.maps.Map(container, options);
    const ps = new window.kakao.maps.services.Places(map);

    // 반경 5KM
    const radius = 5000;
    const center = map.getCenter();

    ps.keywordSearch(
      "서점",
      (data: any[], status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const placeArray = data.sort(
            (prev, next) => prev.distance - next.distance
          );
          setPlace(placeArray);
          data.forEach((place: any) => {
            const marker = new window.kakao.maps.Marker({
              map,
              position: new window.kakao.maps.LatLng(place.y, place.x),
            });
          });
        }
      },
      { location: center, radius }
    );

    // 유저 위치
    const markerPosition = new window.kakao.maps.LatLng(initLat, initLng);
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png"; // 원하는 색상의 마커 이미지
    const imageSize = new window.kakao.maps.Size(24, 35); // 이미지 크기
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
    const userMarker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });
    userMarker.setMap(map);
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

      <div className="map-container" ref={MapRef}></div>

      <div className="location-list-container">
        {place.length > 0 &&
          place.map((data: any) => (
            <LocationItem
              key={`bookstore-location-item-${data.id}`}
              item={data}
            />
          ))}
      </div>
    </div>
  );
};
