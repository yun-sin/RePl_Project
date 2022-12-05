import { configureStore } from "@reduxjs/toolkit";
import MainSlice from "./slices/MainSlice";
import MapSlice from "./slices/MapSlice";

const store = configureStore({
  reducer: {
    MainSlice: MainSlice,
    MapSlice: MapSlice,
  },
});

export default store;
