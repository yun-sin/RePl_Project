/*global kakao*/
import React, { memo, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { positions } from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import markerStar from "../../assets/img/map/markerStar.png";
import markerRed from "../../assets/img/map/markerRed.png";

const MapContainer = styled.div`
  position: relative;

  .yourLoc {
    font-size: 50px;
    color: red;
    position: absolute;
    right: 4vw;
    bottom: 4vw;
    z-index: 9999;
    background-color: white;
    padding: 10px;
    border-radius: 100%;
    cursor: pointer;
    opacity: 0.7;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    &:hover {
      opacity: 1;
    }
  }
`;

// style={{ fontSize: "60px", color: "red", position: "absolute", left: "30px", bottom: "0" }}
const Map = memo(() => {
  const yourLoc = useRef();

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      // 이젠 아카데미 위도 경도
      center: new kakao.maps.LatLng(37.5025506249856, 127.02485228946493),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    console.log("지도 렌더링 🗺️");

    /**
     * 데이터에 저장된 위치 지도에 마커 출력
     */
    positions.forEach((v, i) => {
      var imageSize = new kakao.maps.Size(24, 35); // 마커 이미지의 이미지 크기 입니다
      var markerImage = new kakao.maps.MarkerImage(markerStar, imageSize); // 마커 이미지를 생성합니다

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

    /**
     * 현재 위치 찾기
     */
    yourLoc.current.addEventListener("click", (e) => {
      console.log("현재 위치 찾기 📍");

      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

          var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = '<div style="padding:5px;">현재 위치</div>'; // 인포윈도우에 표시될 내용입니다

          // 마커와 인포윈도우를 표시합니다
          displayMarker(locPosition, message);
        });
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        var locPosition = new kakao.maps.LatLng(37.5025506249856, 127.02485228946493),
          message = "현재 위치를 찾을 수 없습니다.";

        displayMarker(locPosition, message);
      }
    });

    function displayMarker(locPosition, message) {
      var imageSize = new kakao.maps.Size(40, 40); // 마커 이미지의 이미지 크기 입니다
      var markerImage = new kakao.maps.MarkerImage(markerRed, imageSize); // 마커 이미지를 생성합니다

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
        image: markerImage, // 마커 이미지
      });

      var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }
  }, []);

  return (
    <MapContainer>
      <div id="map" style={{ width: "100%", height: "95vh" }}></div>

      {/* 내 위치 찾기 버튼 */}
      <FontAwesomeIcon ref={yourLoc} className="yourLoc" icon={faLocationCrosshairs} />
    </MapContainer>
  );
});

export default Map;
