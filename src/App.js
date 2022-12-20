import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./common/Header";
import Login from "./pages/login/Login";
import Main from "./pages/Main";

import Map from "./pages/map/Map";
import MapAdd from "./pages/map/MapAdd";

import Raffle from "./pages/raffle/Raffle";

import MyPage from "./pages/mypage/MyPage";

/* 메인 컴포넌트 모듈 */
import MapFinder from "./pages/Main/MapFinder";
import Theme from "./pages/Main/Theme";
import ThemeList from "./components/Main/ThemeList";

/* 게시판 컴포넌트 모듈 */
import Bulletin from "./pages/bulletin/Bulletin";
import MyPost from "./pages/bulletin/MyPost";
import NewPost from "./pages/bulletin/NewPost";
import PostView from "./pages/bulletin/PostView";
import RecommendPlace from "./pages/bulletin/RecommendPlace";
import PlaceHashtag from "./pages/bulletin/PlaceHashtag";

const App = memo(() => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />

        {/* 지도 Routes */}
        <Route path="/map" element={<Map />} />
        <Route path="/map/add" element={<MapAdd />} />

        {/* 경품 Routes */}
        <Route path="/raffle" element={<Raffle />} />

        <Route path="/mypage/*" element={<MyPage />} />
        <Route path="/login" element={<Login />} />

        {/* 메인 Routes */}
        <Route path="/map_finder" element={<MapFinder />} />
        <Route path="/theme/:id" element={<Theme />} />
        <Route path="/themelist" element={<ThemeList />} />

        {/* 게시판 Routes */}
        <Route path="/bulletin" element={<Bulletin />} />
        <Route path="/bulletin/mypost/:id" element={<MyPost />} />
        <Route path="/bulletin/newpost/:id" element={<NewPost />} />
        <Route path="/bulletin/postview/:id" element={<PostView />} />
        <Route path="/bulletin/recommend-place" element={<RecommendPlace />} />
        <Route path="/bulletin/place-hashtag" element={<PlaceHashtag />} />
      </Routes>
    </div>
  );
});

export default App;
