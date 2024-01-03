import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

// enums
export const LANG_ENUM = {
  ENG: 'en-US',
  KOR: 'ko-KR',
};
export const THEME_ENUM = {
  LIGHT: 'light',
  DARK: 'dark',
};
type valueOf<T> = T[keyof T];
type LangValueType = valueOf<typeof LANG_ENUM>;
export type ThemeValueType = valueOf<typeof THEME_ENUM>;

// thunk for delayed theme change
type DelayedThemeType = { newTheme: ThemeValueType; time: number };
export const changeThemeDelayed = createAsyncThunk<
  void,
  DelayedThemeType,
  { state: RootState }
>('prefer/changeThemeDelayed', async ({ newTheme, time }, thunkAPI) => {
  if (thunkAPI.getState().prefer.isHomeClosing) {
    throw new Error('Processing a prerequest');
  }
  thunkAPI.dispatch(preferSlice.actions.setHomeClosing(true));
  await delay(time);
  thunkAPI.dispatch(preferSlice.actions.changeTheme(newTheme));
  return;
});

// Slice
let timeoutId: NodeJS.Timeout | null = null;
const initialState: {
  lang: LangValueType | null;
  theme: ThemeValueType | null;
  isHomeClosing: boolean;
} = { lang: null, theme: null, isHomeClosing: false };
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
    setHomeClosing(state, action) {
      state.isHomeClosing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeThemeDelayed.fulfilled, (state) => {
      state.isHomeClosing = false;
    });
  },
});

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export default preferSlice;
