import React, { memo, useCallback } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
  height: 50px;
  width: 100%;
  background-color: gray;

  .navbarMenu {
    float: right;

    a {
      cursor: pointer;
      background-color: green;
      height: 50px;
      margin: 0 10px;

      &:hover {
        color: yellow;
      }
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
        <a>Sidebar</a>
      </div>
    </HeaderContainer>
  );
});

export default Header;
