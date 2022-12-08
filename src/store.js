import { configureStore } from "@reduxjs/toolkit";
import MainSlice from "./slices/MainSlice";
import MapSlice from "./slices/MapSlice";
import BulletinSlice from "./slices/BulletinSlice";

const store = configureStore({
  reducer: {
    MainSlice: MainSlice,
    MapSlice: MapSlice,
    BulletinSlice: BulletinSlice,
  },
});

export default store;
