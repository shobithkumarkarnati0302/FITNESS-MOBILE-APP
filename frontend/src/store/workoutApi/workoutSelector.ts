import { RootState } from '../store';

export const selectWorkouts = (state: RootState) => state.workout.workouts;
export const selectLoading = (state: RootState) => state.workout.loading;
export const selectError = (state: RootState) => state.workout.error;
