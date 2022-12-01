import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./common/Header";
import Login from "./pages/login/Login";
import Main from "./pages/Main";

import MapPage from "./pages/map/MapPage";
import MyPage from "./pages/mypage/MyPage";
import Raffle from "./pages/raffle/Raffle";

/* 게시판 컴포넌트 모듈 */
import Bulletin from "./pages/Bulletin/Bulletin";
import MyPost from "./pages/Bulletin/MyPost";
import NewPost from "./pages/Bulletin/NewPost";

/* 메인 컴포넌트 모듈 */
import MapFinder from "./pages/Main/MapFinder";
import Theme from "./pages/Main/Theme";
import ThemeList from "./components/Main/ThemeList";

const App = memo(() => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/raffle" element={<Raffle />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />

        {/* 게시판 Routes  */}
        <Route path="/bulletin" element={<Bulletin />} />
        <Route path="/bulletin/mypost/:id" element={<MyPost />} />
        <Route path="/bulletin/newpost/:id" element={<NewPost />} />

        {/* 메인 Routes */}
        <Route path='/map_finder' element={<MapFinder />} />
        <Route path='/theme/:id' element={<Theme />} />
        <Route path='/themelist' element={<ThemeList />} />


      </Routes>
    </div>
  );
});

export default App;
