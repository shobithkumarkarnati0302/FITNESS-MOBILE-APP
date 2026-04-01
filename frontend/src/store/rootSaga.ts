import { all } from 'redux-saga/effects';
import { watchAuth } from './sagas/authSaga';
import { watchFav } from './sagas/favSaga';

export function* rootSaga() {
  yield all([watchAuth(), watchFav()]);
}
