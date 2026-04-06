import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkoutState, Exercise } from './workoutTypes';

const initialState: WorkoutState = {
  workouts: [],
  loading: false,
  error: null,
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {

    fetchWorkoutsRequest(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },

    // Replace list — only `workouts` field is touched, loading + error separately
    fetchWorkoutsSuccess(state, action: PayloadAction<Exercise[]>) {
      state.workouts = action.payload;
      state.loading = false;
    },

    // Only error field is updated — nothing else in state is recreated
    fetchWorkoutsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchWorkoutsRequest,
  fetchWorkoutsSuccess,
  fetchWorkoutsFailure,
} = workoutSlice.actions;

export default workoutSlice.reducer;
