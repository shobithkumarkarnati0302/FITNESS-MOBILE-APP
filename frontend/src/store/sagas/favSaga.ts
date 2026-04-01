import { call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/axios';

import * as actions from '../actions/favAction';

// Toggle Favorite Worker Saga
function* toggleFavoriteSaga(action: any): any {
  try {

    const response = yield call(api.post, '/api/toggle', action.payload);
    const favorites = response.data as any[];

    // Persist updated favorites in AsyncStorage
    const userStr = yield call([AsyncStorage, 'getItem'], 'user');
    if (userStr) {
      const user = JSON.parse(userStr);
      user.favorites = favorites;
      yield call([AsyncStorage, 'setItem'], 'user', JSON.stringify(user));
    }

    yield put(actions.setFavorites(favorites));
  } catch (error: any) {
    yield put(
      actions.setFavoriteError(error.message || 'Failed to update favorites'),
    );
  }
}

export function* watchFav() {
  yield takeLatest('fav/TOGGLE_FAVORITE_REQUEST', toggleFavoriteSaga);
}
