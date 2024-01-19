import {
  StageType,
  getCurrentVideoType,
  prepareStage,
} from '@/app/_utils/stageUtil';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { ThemeValueType } from './preferSlice';

// slice
const initialState: {
  stage: StageType;
  videoType: string | null;
  isStageFinished: boolean;
  isProcessing: boolean;
} = {
  stage: 'idle',
  videoType: null,
  isStageFinished: true,
  isProcessing: false,
};

const homeStageSlice = createSlice({
  name: 'homeStage',
  initialState,
  reducers: {
    setStage(state, action) {
      state.stage = action.payload;
    },
    setVideoType(state, action) {
      state.videoType = action.payload;
    },
    setStageFinished(state, action) {
      state.isStageFinished = action.payload;
    },
    setProcessing(state, action) {
      state.isProcessing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeStageTo.pending, (state) => {
      state.isStageFinished = false;
    });
    builder.addCase(changeStageTo.fulfilled, (state) => {
      state.isStageFinished = true;
      state.isProcessing = false;
    });

    builder.addCase(changeStageAndPlay.pending, (state) => {
      state.isStageFinished = false;
    });
    builder.addCase(changeStageAndPlay.fulfilled, (state) => {
      state.isProcessing = false;
    });
  },
});

// thunk
export const changeStageTo = createAsyncThunk<
  void,
  { stage: StageType; theme: ThemeValueType },
  { state: RootState }
>('homeStage/changeStageTo', async ({ stage, theme }, thunkAPI) => {
  // block duplicated requests
  if (thunkAPI.getState().homeStage.isProcessing) {
    throw new Error('duplicated request');
  }
  thunkAPI.dispatch(homeStageSlice.actions.setProcessing(true));

  // change stage
  await prepareStage(stage, theme);
  thunkAPI.dispatch(homeStageSlice.actions.setStage(stage));
});

export const changeStageAndPlay = createAsyncThunk<
  void,
  { stage: StageType; theme: ThemeValueType },
  { state: RootState }
>('homeStage/changeStageAndPlay', async ({ stage, theme }, thunkAPI) => {
  // block duplicated requests
  if (thunkAPI.getState().homeStage.isProcessing) {
    throw new Error('duplicated request');
  }
  thunkAPI.dispatch(homeStageSlice.actions.setProcessing(true));

  // change stage
  await prepareStage(stage, theme);
  thunkAPI.dispatch(homeStageSlice.actions.setStage(stage));

  //set videoType
  thunkAPI.dispatch(homeStageSlice.actions.setVideoType(getCurrentVideoType()));
});

export default homeStageSlice;
