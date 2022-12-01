import React, { memo } from "react";
import styled from "styled-components";

import Slider from "../../components/Main/Slider";
import Search from "../../components/Main/Search";
import PlaceList from "../../components/Main/PlaceList";


const MainContainer = styled.div`
  width: 100%;
  background-color: #d5d5d5;
  padding: 15px;
  box-sizing: border-box;
`;



const index = memo(() => {
  return (
    <MainContainer>
      <Slider />
      <Search />
      <h2>관심사에 따른 장소 추천</h2>
      <PlaceList />
      <h2>요즘 뜨는 장소들</h2>
      <PlaceList />
    </MainContainer>
  );
});

export default index;
