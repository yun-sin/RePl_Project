/*global kakao*/
import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { positions } from "./data";

const MapContainer = styled.div``;

const Map = memo(() => {
  useEffect(() => {
    const container = document.getElementById("map");
  
    const options = {
      center: new kakao.maps.LatLng(37.5025506249856, 127.02485228946493),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    console.log("지도 렌더링 🗺️");

    /**
     * 데이터에 저장된 위치 지도에 마커 출력
     */
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; // 마커 이미지의 이미지 주소입니다
    positions.forEach((v, i) => {
      var imageSize = new kakao.maps.Size(24, 35); // 마커 이미지의 이미지 크기 입니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지를 생성합니다

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(v.latlng[0], v.latlng[1]), // 마커를 표시할 위치
        title: v.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
      marker.setMap(map);

      /**
       * 마커에 mouseover, mouseout 이벤트
       */
      // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
      var iwContent = `<div style="padding:5px;">${v.title}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
      });

      // 마커에 마우스오버 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseover", function () {
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        infowindow.open(map, marker);
      });

      // 마커에 마우스아웃 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseout", function () {
        // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
        infowindow.close();
      });
    });

    /**
     * 지도 클릭 위치 콘솔에 띄움
     */
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      //클릭한 위도, 경도 정보를 가져옵니다.
      const latlng = mouseEvent.latLng;
      console.log("현재 클릭한 위치의 위도: " + latlng.getLat() + ", 경도: " + latlng.getLng());
    });
  }, []);

  return (
    <MapContainer>
      <div id="map" style={{ width: "100%", height: "95vh" }}></div>
    </MapContainer>
  );
});

export default Map;
