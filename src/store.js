import { configureStore } from "@reduxjs/toolkit";
import MainSlice from "./slices/MainSlice";
import MapSlice from "./slices/MapSlice";
import ThemeSlice from "./slices/ThemeSlice";
import MapAddSlice from "./slices/MapAddSlice";
import SidebarSlice from "./slices/SidebarSlice";

/** 게시판 */
import BulletinSlice from "./slices/bulletin/BulletinSlice";
import RecommendPlaceSlice from "./slices/bulletin/RecommendPlaceSlice";
import HashtagSlice from "./slices/bulletin/HashtagSlice";

import MapFinderSlice from "./slices/MapFinderSlice";

const store = configureStore({
  reducer: {
    MainSlice: MainSlice,
    MapSlice: MapSlice,
    ThemeSlice: ThemeSlice,
    MapAddSlice: MapAddSlice,
    SidebarSlice: SidebarSlice,

    /** 게시판 */
    BulletinSlice: BulletinSlice,
    RecommendPlaceSlice: RecommendPlaceSlice,
    HashtagSlice: HashtagSlice,

    MapFinderSlice: MapFinderSlice,
  },
});

export default store;
