/*global kakao*/
import React, { ReactDOM, createElement, memo, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { positions } from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import markerStar from "../../assets/img/map/markerStar.png";
import markerRed from "../../assets/img/map/markerRed.png";
import markerBlue from "../../assets/img/map/markerBlue.png";

const MapContainer = styled.div`
  .yourLoc {
    font-size: 50px;
    color: red;
    position: fixed;
    right: 4vw;
    bottom: 4vw;
    z-index: 1;
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

const ListContainer = styled.div`
  position: fixed;
  height: 100%;
  top: 70px;
  left: 20px;
  z-index: 1;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  div {
    background-color: rgb(255, 255, 255, 0.99);
    border-radius: 10px;
    width: 300px;
    height: 150px;
    margin-bottom: 10px;
    padding: 20px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.2s;

    &.hover {
      background-color: #ccc;
      color: white;
    }

    &.active {
      background-color: #39f;
      color: white;
    }

    h3 {
      text-align: center;
      margin-bottom: 15px;
    }

    h4 {
      font-size: 14px;
      margin-bottom: 15px;
    }
  }
`;

const Map = memo(() => {
  const yourLoc = useRef();
  // useEffect 밖에서 map 객체를 사용하기 위해 usestate로 꺼냄
  const [kakaoMap, setKakaoMap] = useState();
  const kakaoRef = useRef();
  const [btnActive, setBtnActive] = useState();

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      // 이젠 아카데미 위도 경도
      center: new kakao.maps.LatLng(37.5025506249856, 127.02485228946493),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    setKakaoMap(map);
    console.log("🗺️ 지도 렌더링");

    /**
     * 데이터에 저장된 위치 지도에 마커 출력
     */
    positions.forEach((v, i) => {
      var imageSize = new kakao.maps.Size(24, 35); // 마커 이미지의 이미지 크기 입니다
      var overSize = new kakao.maps.Size(29, 42); // 마커 이미지의 이미지 크기 입니다

      var markerImage = new kakao.maps.MarkerImage(markerBlue, imageSize); // 마커 이미지를 생성합니다
      var overImage = new kakao.maps.MarkerImage(markerStar, overSize); // 확대된 마커 이미지를 생성합니다

      // var geocoder = new kakao.maps.services.Geocoder();

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(v.lat, v.lng), // 마커를 표시할 위치
        title: v.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
      marker.setMap(map);

      // const el = document.createElement("div", "hi 123");
      // el.innerHTML = "123";
      // console.log(container);

      /**
       * 마커에 mouseover, mouseout 이벤트
       */
      // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
      var iwContent = `<div style="padding:5px;">${v.title}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        disableAutoPan: true,
        content: iwContent,
      });

      // 마커에 마우스오버 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseover", function () {
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        infowindow.open(map, marker);

        // 마커 이미지 약간 확대
        marker.setImage(overImage);

        document.querySelector(".loc" + i).classList.add("hover");
      });

      // 마커에 마우스아웃 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseout", function () {
        // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
        infowindow.close();

        marker.setImage(markerImage);

        document.querySelector(".loc" + i).classList.remove("hover");
      });

      // 마커에 마우스클릭 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        infowindow.open(map, marker);

        document.querySelector(".loc" + i).scrollIntoView({ behavior: "smooth" });

        setBtnActive(i);
      });

      // 목록에 마우스엔터,리브시 마커에 인포윈도우 출력 이벤트
      document.querySelector(".loc" + i).addEventListener("mouseenter", (e) => {
        infowindow.open(map, marker);

        e.currentTarget.classList.add("hover");

        marker.setImage(overImage);
      });
      document.querySelector(".loc" + i).addEventListener("mouseleave", (e) => {
        infowindow.close();

        e.currentTarget.classList.remove("hover");

        marker.setImage(markerImage);
      });

      // 목록 클릭시 이벤트
      document.querySelector(".loc" + i).addEventListener("click", (e) => {
        var moveLatLng = new kakao.maps.LatLng(v.lat, v.lng);
        setBtnActive(i);

        map.panTo(moveLatLng);
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
      console.log("📍 현재 위치 찾기");

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
      var imageSize = new kakao.maps.Size(35, 35); // 마커 이미지의 이미지 크기 입니다
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
      <div ref={kakaoRef} id="map" style={{ width: "100%", height: "95vh" }}></div>
      {/* 내 위치 찾기 버튼 */}
      <FontAwesomeIcon ref={yourLoc} className="yourLoc" icon={faLocationCrosshairs} />

      <ListContainer id="container">
        {positions.map((v, i) => {
          return (
            <div key={i} data-loc={v.latlng} data-title={v.title} className={`${"loc" + i} ${i == btnActive ? "active" : ""}`}>
              <h3>{v.title}</h3>
              <h4>{v.address}</h4>
              <h4>🧑‍💻</h4>
            </div>
          );
        })}
      </ListContainer>
    </MapContainer>
  );
});

export default Map;
