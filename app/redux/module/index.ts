import { combineReducers } from '@reduxjs/toolkit';
import langSlice from './langSlice';

const rootReducer = combineReducers({
  lang: langSlice.reducer,
});

export default rootReducer;
