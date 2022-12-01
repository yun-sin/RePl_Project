import { configureStore } from "@reduxjs/toolkit";
import MainSlice from "./slices/MainSlice";

const store = configureStore({
    reducer: {
        MainSlice : MainSlice
    }
});

export default store;