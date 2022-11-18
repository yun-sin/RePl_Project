import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Sidebar = styled.div`
  width: 200px;
  height: 100%;
  background-color: red;
  position: fixed;
  right: 0;
  top: 60px;

  a {
    width: 100%;
    height: 100px;
    display: block;
  }
`;

const Header = memo(() => {
  return (
    <div>
      <div className="navbarLogo">
        <NavLink to="/">RePl</NavLink>
      </div>
      <div className="navbarMenu">
        <NavLink to="/login">login</NavLink>

        <Sidebar>
          <NavLink to="/">홈으로</NavLink>
          <NavLink to="/map">지도 찾기</NavLink>
          <NavLink to="/mypage">마이페이지</NavLink>
          <NavLink>로그아웃</NavLink>
          <NavLink to="/map">게시판</NavLink>
          <NavLink to="/raffle">경품페이지</NavLink>
          <NavLink to="/map">의견 및 오류 제보</NavLink>
          <NavLink to="/map">사용 설명서</NavLink>
        </Sidebar>
      </div>
    </div>
  );
});

export default Header;
