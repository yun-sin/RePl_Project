import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
  height: 50px;
  width: 100%;
  background-color: gray;
`;

const SidebarContainer = styled.div`
  width: 200px;
  height: 100%;
  background-color: gainsboro;
  position: fixed;
  right: 0;
  top: 60px;

  a {
    width: 100%;
    height: 20px;
    margin-bottom: 20px;
    display: block;
    text-align: center;
    background-color: gray;
    text-decoration: none;
    color: black;

    &:hover {
      background-color: white;
    }
  }
`;

const Header = memo(() => {
  return (
    <HeaderContainer>
      <div className="navbarLogo">
        <NavLink to="/">RePl</NavLink>
      </div>
      <div className="navbarMenu">
        <NavLink to="/login">login</NavLink>

        <SidebarContainer>
          <NavLink to="/">홈으로</NavLink>
          <NavLink to="/map">지도 찾기</NavLink>
          <NavLink to="/mypage">마이페이지</NavLink>
          <NavLink>로그아웃</NavLink>
          <NavLink to="/map">게시판</NavLink>
          <NavLink to="/raffle">경품페이지</NavLink>
          <NavLink to="/map">의견 및 오류 제보</NavLink>
          <NavLink to="/map">사용 설명서</NavLink>
        </SidebarContainer>
      </div>
    </HeaderContainer>
  );
});

export default Header;
