import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";
import axios from "axios";

export const getMapData = createAsyncThunk("MapSlice/getMapData", async (payload, { rejectWithValue }) => {
  let result = null;

  // // 영역의 남서쪽 좌표를 얻어옵니다
  // if (payload.swLatLng) {
  //   console.log(payload.swLatLng);
  // }

  // // 영역의 북동쪽 좌표를 얻어옵니다
  // if (payload.neLatLng) {
  //   console.log(payload.neLatLng);
  // }

  try {
    const response = await axios.get("/map");
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

const MapSlice = createSlice({
  name: "MapSlice",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getMapData.pending]: (state, { payload }) => {
      return { ...state, loading: true };
    },
    [getMapData.fulfilled]: (state, { payload }) => {
      return {
        data: payload,
        loading: false,
        error: null,
      };
    },
    [getMapData.rejected]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: {
          code: payload.status ? payload.status : 500,
          message: payload.statusText ? payload.statusText : "Server Error",
        },
      };
    },
  },
});

export default MapSlice.reducer;
