import { configureStore } from "@reduxjs/toolkit";
import MainSlice from "./slices/MainSlice";
import MapSlice from "./slices/MapSlice";
import SidebarSlice from "./slices/SidebarSlice";
import BulletinSlice from "./slices/BulletinSlice";
import MapFinderSlice from "./slices/MapFinderSlice";

const store = configureStore({
  reducer: {
    MainSlice: MainSlice,
    MapSlice: MapSlice,
    SidebarSlice: SidebarSlice,
    BulletinSlice: BulletinSlice,
    MapFinderSlice: MapFinderSlice,
  },
});

export default store;
