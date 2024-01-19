import { combineReducers } from '@reduxjs/toolkit';
import homeStageSlice from './homeStageSlice';
import preferSlice from './preferSlice';

const rootReducer = combineReducers({
  prefer: preferSlice.reducer,
  homeStage: homeStageSlice.reducer,
});

export default rootReducer;
