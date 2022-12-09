import React, { memo, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../slices/MainSlice";
import { setActive } from "../../slices/SidebarSlice";
import Sidebar from "./Sidebar";

const TitleContainer = styled.div`
  //임시 배경색상
  background-color: rgba(0, 0, 0, 0.4);
  /* padding: 0 80px; */
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
    div {
      cursor: pointer;
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
  const { filter } = useSelector((state) => state.MainSlice);
  const { isActive } = useSelector((state) => state.SidebarSlice);

 



  
  const dispatch = useDispatch();

  const all = React.useRef();
  const theme = React.useRef();
  const following = React.useRef();

  const onAllClick = useCallback((e) => {
    dispatch(setFilter(0));
    theme.classList.remove("active");
    following.classList.remove("active");
  });

  const onThemeClick = useCallback((e) => {
    dispatch(setFilter(1));
    e.currentTarget.classList.add("active");
    all.classList.remove("active");
    following.classList.remove("active");
  });

  const onFollowingClick = useCallback((e) => {
    dispatch(setFilter(2));

    e.currentTarget.classList.add("active");
    all.classList.remove("active");
    following.classList.remove("active");
  });


  // 사이드바 이벤트
  const onSearch = useCallback(() => {
    dispatch(setActive(true));
    console.log(isActive);

  })

 


  


  return (
    <TitleContainer>
        <Sidebar />
        <div className="title">
          <div className="icon">🗺</div>
          <NavLink to="/map_finder">지도 찾기</NavLink>
        </div>

        <div className="theme_search">
          <div onClick={onSearch}>
            <img src="" alt="" />
            <h2>상황에 맞는 지도를 찾아보세요.</h2>
          </div>
        </div>

        <div className="filter">
          <ul>
            <li>
              <button type="button" onClick={onAllClick} ref={all}>
                모든지도
              </button>
            </li>
            <li>
              <button type="button" onClick={onThemeClick} ref={theme}>
                🗺테마지도
              </button>
            </li>
            <li>
              <button type="button" onClick={onFollowingClick} ref={following}>
                👫팔로잉지도
              </button>
            </li>
          </ul>
        </div>
    </TitleContainer>
  );
});

export default MapFinderTitle;
