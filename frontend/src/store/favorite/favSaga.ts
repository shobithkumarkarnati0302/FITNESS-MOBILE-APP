import { call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/axios';
import { PayloadAction } from '@reduxjs/toolkit';

import * as types from './favTypes';
import {
  toggleFavoriteRequest,
  setFavorites,
  setFavoriteError,
} from './favStore';

function* toggleFavoriteSaga(action: PayloadAction<types.Exercise>) {
  try {
    const response: { data: types.Exercise[] } = yield call(api.post,'/api/toggle',action.payload);
    const favorites                            = response.data;

    const userStr: string | null = yield call([AsyncStorage, 'getItem'],'user');
    if (userStr) {
      const user = JSON.parse(userStr);
      user.favorites = favorites;
      yield call([AsyncStorage, 'setItem'], 'user', JSON.stringify(user));
    }

    yield put(setFavorites(favorites));
  } catch (error: any) {
    yield put(setFavoriteError(error.message ?? 'Failed to update favorites'));
  }
}

export function* watchFav() {
  yield takeLatest(toggleFavoriteRequest.type, toggleFavoriteSaga);
}
