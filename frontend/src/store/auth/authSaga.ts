import { call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/axios';
import { PayloadAction } from '@reduxjs/toolkit';

import * as types from './authTypes';
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  updateProfileRequest,
  loadTokenRequest,
  authSuccess,
  updateProfileSuccess,
  authFailure,
  clearAuth,
} from './authStore';

function* loadTokenSaga() {
  try {
    const token: string = yield call([AsyncStorage, 'getItem'], 'token');
    const user: string = yield call([AsyncStorage, 'getItem'], 'user');
    if (token && user) {
      yield put(authSuccess({ token, user: JSON.parse(user) }));
    } else {
      yield put(clearAuth());
    }
  } catch (e) {
    console.error('Error loading token:', e);
    yield put(clearAuth());
  }
}

// Login Worker Saga
function* loginSaga(action: PayloadAction<types.LoginCredentials>) {
  try {
    const response: { data: types.AuthSuccess } = yield call(api.post, '/auth/login', action.payload);
    const { token, user } = response.data;
    yield call([AsyncStorage, 'setItem'], 'token', token);
    yield call([AsyncStorage, 'setItem'], 'user', JSON.stringify(user));
    yield put(authSuccess({ token, user }));
  } catch (e: any) {
    yield put(authFailure(e.response?.data?.message ?? 'Login failed'));
  }
}

// Register Worker Saga
function* registerSaga(action: PayloadAction<types.RegisterCredentials>) {
  try {
    const response: { data: types.AuthSuccess } = yield call(api.post, '/auth/register', action.payload);
    const { token, user } = response.data;
    yield call([AsyncStorage, 'setItem'], 'token', token);
    yield call([AsyncStorage, 'setItem'], 'user', JSON.stringify(user));
    yield put(authSuccess({ token, user }));
  } catch (e: any) {
    yield put(authFailure(e.response?.data?.message ?? 'Registration failed'));
  }
}

// Update Profile Worker Saga
function* updateProfileSaga(action: PayloadAction<types.UpdateProfileCredentials>) {
  try {
    const response: { data: types.userData } = yield call(api.put, '/api/profile', action.payload);
    const user = response.data;
    yield call([AsyncStorage, 'setItem'], 'user', JSON.stringify(user));
    yield put(updateProfileSuccess(user));
  } catch (e: any) {
    yield put(authFailure(e.response?.data?.message ?? 'Update failed'));
  }
}

// Logout Worker Saga
function* logoutSaga() {
  try {
    yield call([AsyncStorage, 'removeItem'], 'token');
    yield call([AsyncStorage, 'removeItem'], 'user');
    yield put(clearAuth());
  } catch (e) {
    console.log('Error during logout:', e);
    yield put(clearAuth());
  }
}

export function* watchAuth() {
  yield takeLatest(loadTokenRequest, loadTokenSaga);
  yield takeLatest(loginRequest, loginSaga);
  yield takeLatest(registerRequest, registerSaga);
  yield takeLatest(updateProfileRequest, updateProfileSaga);
  yield takeLatest(logoutRequest, logoutSaga);
}
