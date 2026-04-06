import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_NINJAS_KEY } from '@env';

import {
  fetchWorkoutsRequest,
  fetchWorkoutsSuccess,
  fetchWorkoutsFailure,
} from './workoutStore';
import { Exercise } from './workoutTypes';

function* fetchWorkoutsSaga(action: PayloadAction<string>) {
  try {
    const response: { data: Exercise[] } = yield call(
      axios.get,
      `https://api.api-ninjas.com/v1/exercises?muscle=${action.payload}`,
      {
        headers: {
          'X-Api-Key': API_NINJAS_KEY,
        },
      },
    );
    yield put(fetchWorkoutsSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchWorkoutsFailure(error.message ?? 'Failed to fetch workouts'),
    );
  }
}

export function* watchWorkout() {
  yield takeLatest(fetchWorkoutsRequest.type, fetchWorkoutsSaga);
}
