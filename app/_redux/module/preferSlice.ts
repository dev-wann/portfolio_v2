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
let timeoutId: NodeJS.Timeout | null = null;
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
      if (timeoutId) clearTimeout(timeoutId);
      if (action.payload === THEME_ENUM.LIGHT) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('change-theme');
        timeoutId = setTimeout(
          () => document.body.classList.remove('change-theme'),
          600
        );
      } else {
        document.body.classList.add('dark-theme');
        document.body.classList.add('change-theme');
        timeoutId = setTimeout(
          () => document.body.classList.remove('change-theme'),
          600
        );
      }
    },
  },
});

export default preferSlice;
