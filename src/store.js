import { configureStore } from "@reduxjs/toolkit";
import MainSlice from "./slices/MainSlice";
import MapSlice from "./slices/MapSlice";
import ThemeSlice from "./slices/ThemeSlice";
import MapAddSlice from "./slices/MapAddSlice";
import SidebarSlice from "./slices/SidebarSlice";
import BulletinSlice from "./slices/BulletinSlice";
import MapFinderSlice from "./slices/MapFinderSlice";
import PlaceListSlice from "./slices/PlaceListSlice";

const store = configureStore({
  reducer: {
    MainSlice: MainSlice,
    MapSlice: MapSlice,
    ThemeSlice: ThemeSlice,
    MapAddSlice: MapAddSlice,
    SidebarSlice: SidebarSlice,
    BulletinSlice: BulletinSlice,
    MapFinderSlice: MapFinderSlice,
    PlaceListSlice: PlaceListSlice,
  },
});

export default store;
