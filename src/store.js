import { configureStore } from "@reduxjs/toolkit";
import MainSlice from "./slices/MainSlice";
import MapSlice from "./slices/MapSlice";
import SidebarSlice from "./slices/SidebarSlice";
import BulletinSlice from "./slices/BulletinSlice";

const store = configureStore({
  reducer: {
    MainSlice: MainSlice,
    MapSlice: MapSlice,
    SidebarSlice: SidebarSlice,
    BulletinSlice: BulletinSlice,
  },
});

export default store;
