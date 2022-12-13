import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";
import axios from "axios";

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
