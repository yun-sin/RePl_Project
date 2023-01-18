import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";
import { cloneDeep } from "lodash";

/** 모든 장소 데이터를 불러오는 비동기 함수 */
export const getMapData = createAsyncThunk("MapSlice/getMapData", async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    const response = await axios.get("/map");
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

/** 장소 저장을 위한 비동기 함수 */
export const postLoc = createAsyncThunk("MapSlice/postLoc", async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    const response = await axios.post("/map", {
      id: +payload.location.id,
      place_name: payload.location.place_name,
      address_name: payload.location.address_name,
      road_address_name: payload.location.road_address_name,
      lat: payload.location.y,
      lng: payload.location.x,
      category_item_name: payload.location.category_name.split(">").reverse()[0].trim(),
      phone: payload.location.phone,
      place_url: payload.location.place_url,
    });
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

/** 장소 데이터 삭제를 위한 비동기 함수 */
export const deleteLoc = createAsyncThunk("MapSlice/deleteLoc", async (payload, { rejectWithValue }) => {
  let result = null;

  const URL = "/map/" + payload.index;

  try {
    console.log(URL);
    const response = await axios.delete(URL);
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
    /** 모든 장소 데이터를 불러오는 액션 함수 */
    [getMapData.pending]: pending,
    [getMapData.fulfilled]: fulfilled,
    [getMapData.rejected]: rejected,

    /** 장소 저장을 위한 액션 함수 */
    [postLoc.pending]: pending,
    [postLoc.fulfilled]: (state, { meta, payload }) => {
      const data = cloneDeep(state.data);
      data.push(payload);
      return {
        data: data,
        loading: false,
        error: null,
      };
    },
    [postLoc.rejected]: rejected,

    /** 데이터 삭제를 위한 액션 함수 */
    [deleteLoc.pending]: pending,
    [deleteLoc.fulfilled]: (state, { meta, payload }) => {
      const data = cloneDeep(state.data);
      const targetId = data.findIndex((v, i) => v.id == meta.arg.id);
      // console.log(targetId);
      data.splice(targetId, 1);
      return {
        data: data,
        loading: false,
        error: null,
      };
    },
    [deleteLoc.rejected]: rejected,
  },
});

export default MapSlice.reducer;
