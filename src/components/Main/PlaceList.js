import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { getMapData } from "../../slices/MapSlice";
import { getThemeData } from "../../slices/ThemeSlice";

import LocModal from "../../common/LocModal";

const ListContainer = styled.div`
  margin-bottom: 30px;
  width: 60%;
  margin: auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;
    li {
      width: 24%;
      background-color: #f8f8f8;
      text-decoration: none;
      padding: 20px;
      margin: 10px 0 20px 0;
      box-sizing: border-box;
      border-radius: 12px;
      cursor: pointer;

      div {
        display: block;
        div {
          margin-bottom: 5px;
          &:last-child {
            margin-bottom: 0;
          }
          &.title {
            font-size: 16px;
            color: #666;
            font-weight: 600;
          }
          &.address {
            font-size: 12px;
            color: #adadad;
            font-weight: 500;
            margin: 10px 0;
          }
          &.theme {
            font-size: 12px;
            color: #666;
            font-weight: 200;
          }
        }
      }
    }
  }
`;

const PlaceList = memo(() => {
  const [modalContent, setModalContent] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // 후기 팝업창 클릭이벤트 정의
  const onPopUpClick = useCallback((e) => {
    // setModalContent(e.currentTarget.dataset.id);
    setModalIsOpen(true);
    console.log("popup");
    /* 팝업창 추가하기 */
  });

  const { data: data } = useSelector((state) => state.MapSlice);
  const { data: data2 } = useSelector((state) => state.ThemeSlice);

  const randomData = data && [...data]?.sort(() => Math.random() - 0.5);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMapData());
    dispatch(getThemeData());
  }, []);

  return (
    <ListContainer>
      <ul>
        {randomData &&
          randomData
            .map(({ id, place_name, address_name, theme }, i) => {
              return (
                <li key={i} onClick={onPopUpClick} data-id={id}>
                  <div>
                    <div className="place_name">{place_name}</div>
                    <div className="address">{address_name}</div>

                    {theme.map((v, i) => {
                      return (
                        <div className="theme" key={i}>
                          {data2.find((item) => item.id === v)?.icon} {data2.find((item) => item.id === v)?.text} 
                        </div>
                      );
                    })}
                  </div>
                </li>
              );
            })
            ?.slice(0, 4)}
      </ul>
      {/* {modalIsOpen === true? <LocModal /> : ''}; */}
    </ListContainer>
  );
});

export default PlaceList;
