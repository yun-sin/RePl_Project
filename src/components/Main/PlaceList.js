import React, { memo } from 'react';
import styled from 'styled-components';



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
  return (
    <ListContainer>
        <ul>
          {placeArr.map(({ name, address, theme }, i) => {
            return (
              <li>
                <a href="#!">
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