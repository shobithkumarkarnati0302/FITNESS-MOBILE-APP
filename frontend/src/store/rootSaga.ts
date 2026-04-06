import { all } from 'redux-saga/effects';
import { watchAuth } from './auth/authSaga';
import { watchFav } from './favorite/favSaga';
import { watchWorkout } from './workoutApi/workoutSaga';

export function* rootSaga() {
  yield all([
    watchAuth(),
    watchFav(), 
    watchWorkout()
  ]);
}
