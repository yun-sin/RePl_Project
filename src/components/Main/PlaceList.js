import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { getList } from "../../slices/PlaceListSlice";

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
    console.log("popup")
    /* 팝업창 추가하기 */
  });

  const { data, error } = useSelector((state) => state.PlaceListSlice);
  const randomData = data&&([...data]?.sort(() => Math.random() - 0.5));


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList());
  },[]);

  return (
    <ListContainer>
      <ul>
        {randomData &&
          randomData.map(({ id, title, address, theme }, i) => {
            return (
              <li key={i} onClick={onPopUpClick} data-id={id}>
                <div>
                  <div className="title">{title}</div>
                  <div className="address">{address}</div>
                  <div className="theme">{theme[0]}</div>
                  <div className="theme">{theme[1]}</div>
                  <div className="theme">{theme[2]}</div>
                </div>
              </li>
            );
          })?.slice(0,8)}
      </ul>
      {/* {modalIsOpen === true? <LocModal /> : ''}; */}
    </ListContainer>
  );
});

export default PlaceList;
