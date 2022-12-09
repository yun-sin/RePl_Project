import { createSlice } from "@reduxjs/toolkit";

const MainSlice = createSlice({
  name: "MainSlice",
  // 이 모듈이 관리하고자 하는 상태값들을 명시
  initialState: {
    filter: 0,
  },
  reducers: {
    setFilter: (state, action) => {
      let filterValue = action.payload;
      return { filter: filterValue };
    },
  },
});



// 액션함수들 내보내기
export const { setFilter } = MainSlice.actions;


// 리듀서 객체 내보내기
export default MainSlice.reducer;
