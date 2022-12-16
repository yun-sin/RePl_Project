import { createSlice } from "@reduxjs/toolkit";

const MapFinerSlice = createSlice({
  name: "MapFinerSlice",
  // 이 모듈이 관리하고자 하는 상태값들을 명시
  initialState: {
    keyword: null,
  },
  reducers: {
    setKeyword: (state, action) => {
      let keywordValue = action.payload;
      return { keyword: keywordValue };
    },
  },
});



// 액션함수들 내보내기
export const { setKeyword } = MapFinerSlice.actions;


// 리듀서 객체 내보내기
export default MapFinerSlice.reducer;
