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
  width : 60%;
  margin: auto;
  ul {
    display: flex;
    justify-content: space-between;
    li {
      width: 24%;
      background-color: #f8f8f8;
      text-decoration: none;
      padding: 20px;
      margin: 10px 0 50px 0;
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
          &.name {
            font-size: 16px;
            color: #666;
            font-weight: 600;
          }
          &.address {
            font-size: 12px;
            color: #ADADAD;
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
              <li key={i}>
                <a href="#!" onClick={onPopUpClick}>
                  <div className='name'>{name}</div>
                  <div className='address'>{address}</div>
                  <div className='theme'>{theme}</div>
                  <div className='theme'>{theme}</div>
                  <div className='theme'>{theme}</div>
                </a>
              </li>
            );
          })}
        </ul>
      </ListContainer>
  )
});

export default PlaceList;