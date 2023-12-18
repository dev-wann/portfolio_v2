import { combineReducers } from '@reduxjs/toolkit';
import preferSlice from './preferSlice';

const rootReducer = combineReducers({
  prefer: preferSlice.reducer,
});

export default rootReducer;
