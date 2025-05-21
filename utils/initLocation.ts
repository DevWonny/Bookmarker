// 지도 표출 시 최초 사용자 위치 찾기
export const InitLocation = (): Promise<{ lat: number; lng: number; }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('GeoLocation을 지원하지 않음.'));
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
        error => { reject(error) })
    }
  })
}