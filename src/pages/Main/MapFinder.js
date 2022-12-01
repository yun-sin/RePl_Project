import React, { memo } from 'react';
import { useQueryString } from '../../hooks/useQueryString';
import styled from 'styled-components';

import MapFinderTitle from '../../components/Main/MapFinderTitle';
import CreateMap from '../../components/Main/CreateMap';
import AllList from '../../components/Main/AllList';
import ThemeList from '../../components/Main/ThemeList';
import FollowingList from '../../components/Main/FollowingList';

import { useSelector, useDispatch } from "react-redux";



const MapFinderContaier = styled.div`
    padding: 0 80px;
    box-sizing: border-box;
`;


const MapFinder = memo(() => {
    /** QueryStirng 변수 받기 */
    const {keyword} = useQueryString();
    console.log(keyword);

    const { filter } = useSelector((state) => state.MainSlice);
  return (
    <MapFinderContaier>
        <MapFinderTitle />
        {/* filter? { filter=1 &&  <AllList /> } */}
        { filter==0 &&  <AllList /> }
        { filter==1 &&  <ThemeList /> }
        { filter==2 &&  <FollowingList /> }


        {/* <AllList /> */}
        {/* <ThemeList /> */}
        <CreateMap />
    </MapFinderContaier>
  )
})

export default MapFinder