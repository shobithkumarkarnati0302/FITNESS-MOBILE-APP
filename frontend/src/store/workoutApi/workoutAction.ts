import * as types from './workoutTypes';

export const fetchWorkoutsRequest = (muscle: string) => ({
  type: 'workout/fetchWorkoutsRequest',
  payload: muscle,
});

export const fetchWorkoutsSuccess = (workouts: types.Exercise[]) => ({
  type: 'workout/fetchWorkoutsSuccess',
  payload: workouts,
});

export const fetchWorkoutsFailure = (error: string) => ({
  type: 'workout/fetchWorkoutsFailure',
  payload: error,
});
