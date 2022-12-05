/*global kakao*/
import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { getMapData } from "../../slices/MapSlice";
// import { positions } from "./data";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";

import markerStar from "../../assets/img/map/markerStar.png";
import markerRed from "../../assets/img/map/markerRed.png";
import markerBlue from "../../assets/img/map/markerBlue.png";

import { MapContainer } from "./MapContainer";
import { ListContainer } from "./ListContainer";
import Spinner from "./Spinner";

const SearchLoc = styled.div`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  background-color: #da4c1f;
  z-index: 1;
  position: fixed;
  line-height: 1.8;
  font-weight: bold;
  color: white;
  bottom: 4vw;
  left: 50%;
  transform: translate(-50%, 0);
  opacity: 0.8;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  display: flex;

  &:hover {
    opacity: 1;
  }

  span {
    width: 80%;
  }

  input,
  svg {
    width: 20%;
    margin: 6.5px 0;
  }
`;

const Map = memo(() => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.MapSlice);

  const yourLoc = useRef();
  const kakaoRef = useRef();
  const [kakaoMap, setKakaoMap] = useState();
  const [btnActive, setBtnActive] = useState();

  useEffect(() => {
    dispatch(getMapData());
  }, []);

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

    if (data) {
      /**
       * 데이터에 저장된 위치 지도에 마커 출력
       */
      data.forEach((v, i) => {
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

        /** 마커 마우스오버 이벤트 */
        kakao.maps.event.addListener(marker, "mouseover", function () {
          // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
          infowindow.open(map, marker);
          // 마커 이미지 약간 확대
          marker.setImage(overImage);
          document.querySelector(".loc" + i).classList.add("hover");
        });

        /** 마커 마우스아웃 이벤트 */
        kakao.maps.event.addListener(marker, "mouseout", function () {
          // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
          infowindow.close();
          marker.setImage(markerImage);
          document.querySelector(".loc" + i).classList.remove("hover");
        });

        /** 마커 마우스클릭 이벤트 */
        kakao.maps.event.addListener(marker, "click", function () {
          // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
          infowindow.open(map, marker);
          document.querySelector(".loc" + i).scrollIntoView({ behavior: "smooth" });
          setBtnActive(i);
        });

        /** 목록에 마우스엔터,리브시 마커에 인포윈도우 출력 이벤트 */
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

        /** 목록 클릭시 이벤트 */
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
    }
  }, [data]);

  const onSearchLoc = useCallback((e) => {
    // 지도의 현재 중심좌표를 얻어옵니다
    var center = kakaoMap.getCenter();

    // 지도의 현재 영역을 얻어옵니다
    var bounds = kakaoMap.getBounds();
    // 영역의 남서쪽 좌표를 얻어옵니다
    var swLatLng = bounds.getSouthWest();
    // 영역의 북동쪽 좌표를 얻어옵니다
    var neLatLng = bounds.getNorthEast();

    console.log(swLatLng);
    console.log(neLatLng);

    console.log(data);
  });

  return (
    <MapContainer>
      <Spinner loading={loading} />

      <div ref={kakaoRef} id="map" style={{ width: "100%", height: "95vh" }}></div>

      {/* 내 위치 찾기 버튼 */}
      <FontAwesomeIcon ref={yourLoc} className="yourLoc" icon={faLocationCrosshairs} />

      {/* 이 위치에서 다시 찾기*/}
      <SearchLoc onClick={onSearchLoc}>
        <span>이 위치에서 찾기</span>
        {SearchLoc ? <input type="checkbox" /> : <FontAwesomeIcon icon={faMagnifyingGlassLocation} />}
      </SearchLoc>

      <ListContainer id="container">
        {data?.map((v, i) => {
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
