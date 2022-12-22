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
export const postLoc = createAsyncThunk("DepartmentSlice/postLoc", async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    const response = await axios.post("/map", {
      address_name: payload.location.address_name,
      category_group_code: payload.location.category_group_code,
      category_name: payload.location.category_name,
      category_group_name: payload.location.category_group_name,
      category_item_name: payload.location.category_name.split(">").reverse()[0].trim(),
      phone: payload.location.phone,
      place_name: payload.location.place_name,
      place_url: payload.location.place_url,
      place_id: payload.location.id,
      road_address_name: payload.location.road_address_name,
      lat: +payload.location.y,
      lng: +payload.location.x,
      theme: [payload.theme],
      review: [],
      place_img: [],
      like: 0,
      rating: [],
    });
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

/** 한 장소의 리뷰 또는 테마 수정을 위한 비동기 함수 */
export const putLoc = createAsyncThunk("DepartmentSlice/putLoc", async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    const response = await axios.put("/map?place_id" + payload.place_id, {
      address_name: payload.location.address_name,
      category_group_code: payload.location.category_group_code,
      category_name: payload.location.category_name,
      category_group_name: payload.location.category_group_name,
      category_item_name: payload.location.category_name.split(">").reverse()[0].trim(),
      phone: payload.location.phone,
      place_name: payload.location.place_name,
      place_url: payload.location.place_url,
      place_id: payload.location.id,
      road_address_name: payload.location.road_address_name,
      lat: +payload.location.y,
      lng: +payload.location.x,
      theme: payload.theme.push(payload.newTheme),
      review: payload.review.push(payload.newReview),
    });
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
      // 기존의 상태값을 복사한다. (원본이 JSON이므로 깊은 복사를 수행해야 한다.)
      const data = cloneDeep(state.data);
      // console.log(data);

      // 새로 저장된 결과를 기존 상태값 배열의 맨 뒤에 추가한다.
      data.push(payload);

      return {
        data: data,
        loading: false,
        error: null,
      };
    },
    [postLoc.rejected]: rejected,

    /** 한 장소의 리뷰 또는 테마 수정을 위한 액션 함수 */
    [putLoc.pending]: pending,
    [putLoc.fulfilled]: (state, { meta, payload }) => {
      const data = cloneDeep(state.data);

      const targetId = data.findIndex((v, i) => v.id == meta.arg.id);
      console.log(targetId);

      data.splice(targetId, 1, payload);

      return {
        data: data,
        loading: false,
        error: null,
      };
    },
    [putLoc.rejected]: rejected,
  },
});

export default MapSlice.reducer;
