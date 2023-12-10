import { createSlice } from '@reduxjs/toolkit';

export const LANG_ENUM = {
  ENG: 'en-US',
  KOR: 'ko-KR',
};

// Slice
const initialState = { data: null };
const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    changeLang(state, action) {
      state.data = action.payload;
      localStorage.setItem('lang', action.payload);
    },
  },
});

export default langSlice;
