import React, { memo, useCallback, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
  height: 50px;
  width: 100%;
  background-color: #eee;

  a {
    text-decoration: none;
  }

  .navbarLogo {
    float: left;
    height: 50px;
    line-height: 50px;
    width: 100px;
    text-align: center;
    background-color: #bbb;
  }

  .navbarMenu {
    float: right;

    a {
      cursor: pointer;
      height: 50px;
      width: 100px;
      text-align: center;
      margin-left: 10px;
      display: inline-block;
      line-height: 50px;

      &:hover {
        color: white;
        background-color: #bbb;
      }

      &.Sidebar.active {
        background-color: #ccc;
      }
    }
  }
`;

const SidebarContainer = styled.div`
  width: 300px;
  background-color: rgba(200, 200, 200, 0.5);
  height: 100%;
  position: fixed;
  top: 50px;
  right: -300px;
  transition: 0.5s;

  &.active {
    right: 0;
  }

  a {
    width: 80%;

    height: 50px;
    display: block;
    text-align: center;
    font-size: 30px;
    line-height: 50px;
    margin: 30px auto;
    background-color: #aaa;
    color: black;

    &:first-of-type {
      margin-top: 70px;
    }

    &:nth-of-type(2n) {
      margin-bottom: 100px;
    }

    &:hover {
      background-color: #eee;
    }

    &.active {
      background-color: rgba(20, 150, 150, 0.5);
    }
  }
`;

const Header = memo(() => {
  const SidebarCon = useRef();
  const [isActive, setActive] = useState(false);

  const onSidebarClick = useCallback((e) => {
    e.preventDefault();
    setActive(!isActive);
  });

  return (
    <HeaderContainer>
      <div className="navbarLogo">
        <NavLink to="/">RePl</NavLink>
      </div>
      <div className="navbarMenu">
        <NavLink to="/login">login</NavLink>
        <a onClick={onSidebarClick} className={`Sidebar ${isActive ? "active" : ""}`}>
          Sidebar
        </a>
      </div>

      <SidebarContainer ref={SidebarCon} className={`${isActive ? "active" : ""}`}>
        <NavLink to="/">홈으로</NavLink>
        <NavLink to="/map">지도찾기</NavLink>
        <NavLink to="/login">마이페이지</NavLink>
        <NavLink to="!#">로그아웃</NavLink>
        <NavLink to="/bulletin">게시판</NavLink>
        <NavLink to="/raffle">경품페이지</NavLink>
        <NavLink to="!#">의견 및 오류제보</NavLink>
        <NavLink to="!#">사용 설명서</NavLink>
      </SidebarContainer>
    </HeaderContainer>
  );
});

export default Header;
