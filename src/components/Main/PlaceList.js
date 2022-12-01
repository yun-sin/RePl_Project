import React, { memo, useCallback } from 'react';
import styled from 'styled-components';


// 임시데이터
const placeArr = [
    { name: "가게이름1", address: "주소1", theme: "테마이름" },
    { name: "가게이름2", address: "주소2", theme: "테마이름" },
    { name: "가게이름3", address: "주소3", theme: "테마이름" },
    { name: "가게이름4", address: "주소4", theme: "테마이름" },
];

const ListContainer = styled.div`
  margin-bottom: 30px;
  ul {
    display: flex;
    justify-content: space-between;
    li {
      width: 24%;
      background-color: #bbb;
      text-decoration: none;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 12px;
      a {
        display: block;
        text-decoration: none;
        div {
          margin-bottom: 5px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
`;


const PlaceList = memo(() => {
  // 후기 팝업창 클릭이벤트 정의
  const onPopUpClick = useCallback((e) => {
  e.preventDefault();
  /* 팝업창 추가하기 */
})

  return (
    <ListContainer>
        <ul>
          {placeArr.map(({ name, address, theme }, i) => {
            return (
              <li>
                <a href="#!" onClick={onPopUpClick}>
                  <div>{name}</div>
                  <div>{address}</div>
                  <div>{theme}</div>
                  <div>{theme}</div>
                  <div>{theme}</div>
                </a>
              </li>
            );
          })}
        </ul>
      </ListContainer>
  )
});

export default PlaceList;