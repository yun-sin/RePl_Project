import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./common/Header";
import Login from "./pages/login/Login";
import Main from "./pages/Main";

import MapPage from "./pages/map/MapPage";
import MyPage from "./pages/mypage/MyPage";
import Raffle from "./pages/raffle/Raffle";

const App = memo(() => {
  return (
    <div>

      <Header />

      <hr />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/raffle" element={<Raffle />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
});

export default App;
