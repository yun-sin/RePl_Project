import React, { memo } from 'react';
import {Routes, Route} from "react-router-dom";
import MenuLink from '../../components/mypage/MenuLink';
import Info from './Info';
import Interests from './Interests';
import Map from './Map';
import Follow from './Follow';
import Noti from './Noti';
import styled from 'styled-components';
import '../../assets/css/fonts.css';

const MenuTab = styled.nav`
    position: fixed;
    top: 50%;
    transform: translate(0,-70%);
    display: flex;
    flex-direction: column;
`

const MyPage = memo(() => {
    return (
        <div>
            <MenuTab>
                <MenuLink to="info">내 정보관리</MenuLink>
                <MenuLink to="interests">내 관심사</MenuLink>
                <MenuLink to="map">나의 지도 관리</MenuLink>
                <MenuLink to="follow">팔로워/팔로잉</MenuLink>
                <MenuLink to="noti">신고 목록</MenuLink>
            </MenuTab>

            <Routes>
                <Route path="info" element={<Info/>} />
                <Route path="interests" element={<Interests/>} />
                <Route path="map" element={<Map/>} />
                <Route path="follow" element={<Follow/>} />
                <Route path="noti" element={<Noti/>} />
            </Routes>
        </div>
    );
});

export default MyPage;