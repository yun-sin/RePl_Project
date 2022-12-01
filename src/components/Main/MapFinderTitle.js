import React, { memo, useCallback } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../slices/MainSlice";

const TitleContainer = styled.div`
  //임시 배경색상
  background-color: rgba(0, 0, 0, 0.4);

  .title {
    margin-bottom: 60px;
    .icon {
      font-size: 37px;
    }
    a {
      font-size: 30px;
      font-weight: bolder;
      color: #fefefe;
    }
  }

  .theme_search {
    a {
      h2 {
        font-size: 20px;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  .filter {
    margin: 20px 0;
    ul {
      display: flex;
      li {
        margin-bottom: 15px;
        button {
          margin-right: 10px;
          padding: 10px;
          font-size: 13px;
          border-radius: 8px;
          cursor: pointer;
          background-color: #f3f5f7;
          border: none;
          &:hover {
            background-color: #eee;
          }
        }

        &:first-child {
          button {
            color: #fefefe;
            background-color: #da4c1f;
          }
        }

        .active {
            color: #fefefe;
            background-color: #da4c1f;
        }

        a {
          text-decoration: none;
          color: #444444;
        }
      }
    }
  }
`;

const MapFinderTitle = memo(() => {
    const onAllClick = useCallback((e) => {
        dispatch(setFilter(0));

    });
    
    const onThemeClick = useCallback((e) => {
        dispatch(setFilter(1));   
        e.currentTarget.classList.add('active');    
    });
    
    const onFollowingClick = useCallback((e) => {
        dispatch(setFilter(2));
        e.currentTarget.classList.add('active');    

    });
  const { filter } = useSelector((state) => state.MainSlice);
  const dispatch = useDispatch();

  console.log(filter);

  return (
    <TitleContainer>
      <div className="title">
        <div className="icon">🗺</div>
        <a href="">지도 찾기</a>
      </div>

      <div className="theme_search">
        <a href="">
          <img src="" alt="" />
          <h2>상황에 맞는 지도를 찾아보세요.</h2>
        </a>
      </div>

      <div className="filter">
        <ul>
          <li>
            <button type="button" onClick={onAllClick}>모든지도</button>
          </li>
          <li>
            <button type="button" onClick={onThemeClick}>🗺테마지도</button>
          </li>
          <li>
            <button type="button" onClick={onFollowingClick}>👫팔로잉지도</button>
          </li>
        </ul>
      </div>
    </TitleContainer>
  );
});

export default MapFinderTitle;
