import { configureStore } from "@reduxjs/toolkit";
import MainSlice from "./slices/MainSlice";
import MapSlice from "./slices/MapSlice";
import MapThemeSlice from "./slices/MapThemeSlice";
import ThemeSlice from "./slices/ThemeSlice";
import MapAddSlice from "./slices/MapAddSlice";
import SidebarSlice from "./slices/SidebarSlice";
import NavbarSlice from "./slices/NavbarSlice";

/** 게시판 */
import BulletinSlice from "./slices/bulletin/BulletinSlice";
import RecommendPlaceSlice from "./slices/bulletin/RecommendPlaceSlice";
import HashtagSlice from "./slices/bulletin/HashtagSlice";
import PostViewSlice from './slices/bulletin/PostViewSlice';
import CommentsSlice from './slices/bulletin/CommentsSlice';
import OtherPostSlice from './slices/bulletin/OtherPostSlice';
import RecommendedPlaceSlice from './slices/bulletin/RecommendedPlaceSlice';

import MapFinderSlice from "./slices/MapFinderSlice";

/** 로그인, 마이페이지 */
import LoginSlice from "./slices/login/LoginSlice";
import InfoSlice from "./slices/InfoSlice";
import MyPageSlice from "./slices/MyPageSlice";
import InterestSlice from "./slices/InterestSlice";

const store = configureStore({
  reducer: {
    MainSlice: MainSlice,

    /** 지도 */
    MapSlice: MapSlice,
    MapThemeSlice: MapThemeSlice,
    ThemeSlice: ThemeSlice,
    MapAddSlice: MapAddSlice,

    SidebarSlice: SidebarSlice,
    NavbarSlice: NavbarSlice,

    /** 게시판 */
    BulletinSlice: BulletinSlice,
    RecommendPlaceSlice: RecommendPlaceSlice,
    HashtagSlice: HashtagSlice,
    PostViewSlice: PostViewSlice,
    CommentsSlice: CommentsSlice,
    OtherPostSlice: OtherPostSlice,
    RecommendedPlaceSlice: RecommendedPlaceSlice,

    MapFinderSlice: MapFinderSlice,

    /** 로그인, 마이페이지 */
    LoginSlice: LoginSlice,
    InfoSlice: InfoSlice,
    MyPageSlice: MyPageSlice,
    InterestSlice: InterestSlice,
  },
});

export default store;
