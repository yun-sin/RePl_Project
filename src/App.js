import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";

import MapPage from "./pages/map/MapPage";
import Raffle from "./pages/raffle/Raffle";

const App = memo(() => {
  return (
    <div>
      <h1>Re_pl 제목</h1>

      <hr />

      <Routes>
        <Route path="/map" element={<MapPage />} />
        <Route path="/raffle" element={<Raffle />} />
      </Routes>
    </div>
  );
});

export default App;
