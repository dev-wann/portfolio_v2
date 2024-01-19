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
} = {
  stage: 'idle',
  videoType: null,
  isStageFinished: true,
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
  },
  extraReducers: (builder) => {
    builder.addCase(changeStageTo.pending, (state) => {
      state.isStageFinished = false;
    });
    builder.addCase(changeStageTo.fulfilled, (state) => {
      state.isStageFinished = true;
    });
    builder.addCase(changeStageTo.rejected, (state) => {
      state.isStageFinished = true;
    });
    builder.addCase(changeStageAndPlay.pending, (state) => {
      state.isStageFinished = false;
    });
  },
});

// thunk
export const changeStageTo = createAsyncThunk<
  void,
  { stage: StageType; theme: ThemeValueType },
  { state: RootState }
>('homeStage/changeStageTo', async ({ stage, theme }, thunkAPI) => {
  await prepareStage(stage, theme);
  thunkAPI.dispatch(homeStageSlice.actions.setStage(stage));
});

export const changeStageAndPlay = createAsyncThunk<
  void,
  { stage: StageType; theme: ThemeValueType },
  { state: RootState }
>('homeStage/changeStageAndPlay', async ({ stage, theme }, thunkAPI) => {
  await prepareStage(stage, theme);
  thunkAPI.dispatch(homeStageSlice.actions.setStage(stage));

  //set videoType
  thunkAPI.dispatch(homeStageSlice.actions.setVideoType(getCurrentVideoType()));
});

export default homeStageSlice;
