/*global kakao*/
import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMapData } from "../../slices/MapSlice";
import { MapContainer, ListContainer, SearchLoc, ModalContainer } from "./MapStyled";
import Modal from "react-modal";
import Spinner from "./Spinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs, faMagnifyingGlassLocation, faX } from "@fortawesome/free-solid-svg-icons";

import markerStar from "../../assets/img/map/markerStar.png";
import markerRed from "../../assets/img/map/markerRed.png";
import markerBlue from "../../assets/img/map/markerBlue.png";
import iconMore from "../../assets/img/map/icon-more.svg";
import iconPlus from "../../assets/img/map/icon-plus-grey-sm.svg";

const Map = memo(() => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.MapSlice);

  const yourLoc = useRef();
  const kakaoRef = useRef();
  const [replMap, setReplMap] = useState();
  const [btnActive, setBtnActive] = useState();

  const [swLimit, setSwLimit] = useState();
  const [neLimit, setNeLimit] = useState();
  const [centerCoord, setCenterCoord] = useState([37.5025506249856, 127.02485228946493]);

  const [modalContent, setModalContent] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      // 이젠 아카데미 위도 경도
      center: new kakao.maps.LatLng(centerCoord[0], centerCoord[1]),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    setReplMap(map);
    console.log("🗺️ 지도 렌더링");

    dispatch(getMapData()).then((result) => console.log(result));
  }, []);

  useEffect(() => {
    if (data) {
      console.log("📍 마커 렌더링");
      /**
       * 데이터에 저장된 위치 지도에 마커 출력
       */
      const imageSize = new kakao.maps.Size(24, 35); // 마커 이미지의 이미지 크기 입니다
      const overSize = new kakao.maps.Size(29, 42); // 마커 이미지의 이미지 크기 입니다

      const markerImage = new kakao.maps.MarkerImage(markerBlue, imageSize); // 마커 이미지를 생성합니다
      const overImage = new kakao.maps.MarkerImage(markerStar, overSize); // 확대된 마커 이미지를 생성합니다

      data.forEach((v, i) => {
        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
          map: replMap, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(v.lat, v.lng), // 마커를 표시할 위치
          title: v.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
        });
        marker.setMap(replMap);

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
          infowindow.open(replMap, marker);
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
          infowindow.open(replMap, marker);
          document.querySelector(".loc" + i).scrollIntoView({ behavior: "smooth" });
          setBtnActive(i);
        });

        /** 목록에 마우스엔터,리브시 마커에 인포윈도우 출력 이벤트 */
        document.querySelector(".loc" + i).addEventListener("mouseenter", (e) => {
          infowindow.open(replMap, marker);
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
          replMap.panTo(moveLatLng);
        });
      });

      /**
       * 지도 클릭 위치 콘솔에 띄움
       */
      // kakao.maps.event.addListener(kakaoMap, "click", function (mouseEvent) {
      //   //클릭한 위도, 경도 정보를 가져옵니다.
      //   const latlng = mouseEvent.latLng;
      //   console.log("현재 클릭한 위치의 위도: " + latlng.getLat() + ", 경도: " + latlng.getLng());
      // });

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
          map: replMap,
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
        infowindow.open(replMap, marker);

        // 지도 중심좌표를 접속위치로 변경합니다
        replMap.setCenter(locPosition);
      }
    }
  }, [data, swLimit, neLimit]);

  const onSearchLoc = useCallback((e) => {
    // 지도의 현재 중심좌표를 얻어옵니다
    var center = replMap.getCenter();

    // 지도의 현재 영역을 얻어옵니다
    var bounds = replMap.getBounds();
    // 영역의 남서쪽 좌표를 얻어옵니다
    var swLatLng = bounds.getSouthWest();
    // 영역의 북동쪽 좌표를 얻어옵니다
    var neLatLng = bounds.getNorthEast();

    console.log("현재 영역의 남서쪽 좌표 : " + swLatLng + ", 북동쪽 좌표 : " + neLatLng);

    setSwLimit(swLatLng);
    setNeLimit(neLatLng);

    setCenterCoord([center["Ma"], center["La"]]);
  });

  const onModalIsOpen = useCallback((e) => {
    setModalContent(e.currentTarget.dataset.id);
    setModalIsOpen(true);
    console.log(data.modalContent);
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
            <div key={i} data-loc={v.latlng} data-title={v.title} className={`${"list_item"} ${"loc" + i} ${i == btnActive ? "active" : ""}`}>
              <h3>{v.title}</h3>
              <h4>{v.address}</h4>
              <a>🧑‍💻 혼자 노트북들고 작업하러 가기 좋은 곳</a>
              <div className="more_btn" onClick={onModalIsOpen} data-id={v.id}>
                <img src={iconMore} />
              </div>
            </div>
          );
        })}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          ariaHideApp={false}
          style={{
            overlay: {
              backgroundColor: "rgba(50, 50, 50, 0.75)",
              zIndex: 99999,
            },
            content: {
              backgroundColor: "#F8F8F8",
              width: "700px",
              maxHeight: "1000px",
              left: "300px",
              borderRadius: "15px",
              padding: "40px",
              margin: "auto",
            },
          }}>
          {data?.map((v, i) => {
            if (v["id"] == modalContent)
              return (
                <ModalContainer>
                  <div className="modal-header">
                    <h3>{v["title"]}</h3>
                    <span>{v["address"]}</span>
                    <FontAwesomeIcon className="faX" icon={faX} onClick={() => setModalIsOpen(false)} />
                  </div>
                  <div className="modal-body">
                    <div className="modal-img-container">
                      <div className="icon">
                        <img src={iconPlus} />
                      </div>
                      <div className="text">
                        여기를 눌러서 장소와 관련된 사진을 올려주시면
                        <br />
                        페이지가 더 유익해 질 것 같아요!
                      </div>
                    </div>
                    <div className="modal-info-container">
                      <div className="info">
                        <div className="info-item">
                          <div className="title">여기는 어떤 곳인가요?</div>
                          <div className="theme-card">🛋 편안한 의자가 있어서 책 읽기 좋은 카페</div>
                          <div className="theme-card">💻 혼자 노트북들고 작업하러 가기 좋은 곳</div>
                        </div>
                        <div className="info-item">
                          <div className="title">123</div>
                        </div>
                      </div>
                      <div className="info">
                        <div className="info-item">
                          <div className="title">이 장소에 대한 후기들!</div>
                          <div className="theme-card">☕️두유 옵션 제공 카페</div>
                          <div className="theme-card">🛋 편안한 의자가 있어서 책 읽기 좋은 카페</div>
                        </div>
                        <div className="info-item">
                          <div className="title">직접 의견을 남겨보세요!</div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-bullet-container">
                      <div className="title">이 장소를 추천한 게시글 목록</div>
                    </div>
                  </div>
                  <div className="modal-footer"></div>
                </ModalContainer>
              );
          })}
        </Modal>
      </ListContainer>
    </MapContainer>
  );
});

export default Map;
