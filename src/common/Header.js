import React, { memo, useCallback, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActive } from "../slices/SidebarSlice";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const HeaderContainer = styled.div`
  height: 50px;
  width: 100%;
  /* padding: 10px 0; */
  box-sizing: border-box;
  /* background-color: #f8f8f8; */
  /* background-color: #fff; */
  background-color: #0584bb;

  z-index: 999;
  /* box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2); */

  .shadow {
      &.active {
        position: fixed;
        z-index: 990;
        width: 100%;
        /* height: 50px; */
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
      }
    }

  .navbarLogo {
    background-color: #0584bb;

    a {
      font-size: 25px;
      color: #fff;
    }
  }

  a {
    font-weight: bolder;

    text-decoration: none;
    /* color : #0584BB;     */
    color: #fff;
  }

  .navbarLogo {
    float: left;
    height: 50px;
    line-height: 50px;
    width: 100px;
    text-align: center;
  }

  .navbarMenu {
    float: right;
    .hamburger {
      font-size: 20px;
    }

    a {
      cursor: pointer;
      height: 50px;
      width: 100px;
      text-align: center;
      margin-left: 10px;
      display: inline-block;
      line-height: 50px;

      /* &:hover {
        color: #0584bb;
        background-color: #fff;
      } */

      &.Sidebar.active {
        background-color: #ccc;
      }
    }
  }

  
`;

const SidebarContainer = styled.div`
  z-index: 9999;
  width: 300px;
  background-color: #f8f8f8;
  height: 100%;
  position: fixed;
  /* top: 50px; */
  top: 0px;

  right: -300px;
  transition: 0.5s;

  &.active {
    right: 0;
  }

  a {
    width: 80%;
    height: 50px;
    display: block;
    text-align: left;
    font-size: 30px;
    line-height: 50px;
    margin: 30px auto;
    color: #666;
    font-size: 15px;

    &:first-of-type {
      margin-top: 70px;
    }

    &:nth-of-type(2n) {
      margin-bottom: 100px;
    }

    &:hover {
      background-color: #eee;
      font-weight: bolder;
    }

    &.active {
      background-color: rgba(20, 150, 150, 0.5);
    }

    
  }
`;

const Header = memo(() => {
  const SidebarCon = useRef();
  const [sideActive, setSideActive] = useState(false);


  const dispatch = useDispatch();

  const { isActive } = useSelector((state) => state.SidebarSlice);
  
  console.log(isActive);


  const onSidebarClick = useCallback((e) => {
    e.preventDefault();
    setSideActive(!sideActive);
    dispatch(setActive(true));
  });

  const handleClose = useCallback((e) => {
    if (isActive) {
      dispatch(setActive(false));
    }
  });
  return (
    <HeaderContainer>
      <div
        className={`shadow ${isActive ? "active" : ""}`}
        onClick={handleClose}
      ></div>

      <div className="navbarLogo">
        <NavLink to="/">RePl</NavLink>
      </div>
      <div className="navbarMenu">
        <NavLink to="/login">로그인</NavLink>
        <a
          onClick={onSidebarClick}
          className={`Sidebar ${sideActive ? "active" : ""}`}
        >
          <FontAwesomeIcon icon={faBars} className="hamburger" />
        </a>
      </div>

      <SidebarContainer
        ref={SidebarCon}
        className={`${sideActive ? "active" : ""}`}
      >
        <NavLink to="/">🏠 홈으로</NavLink>
        <NavLink to="/map_finder">🗺 지도찾기</NavLink>
        <NavLink to="/mypage">🧒 마이페이지</NavLink>
        <NavLink to="!#">👋 로그아웃</NavLink>
        <NavLink to="/bulletin">📌 게시판</NavLink>
        <NavLink to="/raffle">🎉 경품페이지</NavLink>
        <NavLink to="!#">💬 의견 및 오류제보</NavLink>
        <NavLink to="!#">📝 사용 설명서</NavLink>
      </SidebarContainer>
    </HeaderContainer>
  );
});

export default Header;
