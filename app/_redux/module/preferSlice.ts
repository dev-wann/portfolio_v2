import { createSlice } from '@reduxjs/toolkit';

// enums
export const LANG_ENUM = {
  ENG: 'en-US',
  KOR: 'ko-KR',
};
export const THEME_ENUM = {
  LIGHT: 'light',
  DARK: 'dark',
};

// Slice
const initialState = { lang: null, theme: null };
const preferSlice = createSlice({
  name: 'prefer',
  initialState,
  reducers: {
    changeLang(state, action) {
      state.lang = action.payload;
      localStorage.setItem('lang', action.payload);
    },
    changeTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
      if (action.payload === THEME_ENUM.LIGHT) {
        document.body.classList.remove('dark-theme');
      } else {
        document.body.classList.add('dark-theme');
      }
    },
  },
});

export default preferSlice;
