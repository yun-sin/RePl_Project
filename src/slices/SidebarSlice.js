import { createSlice } from "@reduxjs/toolkit";

const SidebarSlice = createSlice({
  name: "SidebarSlice",
  // 이 모듈이 관리하고자 하는 상태값들을 명시
  initialState: {
    isActive : false,
  },
  reducers: {
    setActive : (state, action) => {
      let isActiveValue  = action.payload;
      console.log(action.payload);
      return { isActive : isActiveValue };
    }
  },
});



// 액션함수들 내보내기
export const { setActive } = SidebarSlice.actions;


// 리듀서 객체 내보내기
export default SidebarSlice.reducer;
