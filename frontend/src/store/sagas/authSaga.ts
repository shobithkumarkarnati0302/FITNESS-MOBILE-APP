import { call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/axios';

import * as types from '../types/authTypes';
import * as actions from '../actions/authAction';

// Load_token Worker Saga
function* loadTokenSaga(): any {
  try {
    const token = yield call([AsyncStorage, 'getItem'], 'token');
    const user = yield call([AsyncStorage, 'getItem'], 'user');
    if (token && user) {
      yield put(actions.authSuccess({ token, user: JSON.parse(user) }));
    } else {
      yield put(actions.clearAuth());
    }
  } catch (e) {
    console.error('Error loading token:', e);
    yield put(actions.clearAuth());
  }
}

// Login Worker Saga
function* loginSaga(action: any): any {
  try {
    const response = yield call(api.post, '/auth/login', action.payload);
    const { token, user } = response.data as types.AuthSuccess;
    yield call([AsyncStorage, 'setItem'], 'token', token);
    yield call([AsyncStorage, 'setItem'], 'user', JSON.stringify(user));
    yield put(actions.authSuccess({ token, user }));
  } catch (e: any) {
    yield put(actions.authFailure(e.response?.data?.message));
  }
}

// Register Worker Saga
function* registerSaga(action: any): any {
  try {
    const response = yield call(api.post, '/auth/register', action.payload);
    const { token, user } = response.data as types.AuthSuccess;
    yield call([AsyncStorage, 'setItem'], 'token', token);
    yield call([AsyncStorage, 'setItem'], 'user', JSON.stringify(user));
    yield put(actions.authSuccess({ token, user }));
  } catch (e: any) {
    yield put(
      actions.authFailure(e.response?.data?.message || 'Registration failed'),
    );
  }
}

// Update Profile Worker Saga
function* updateProfileSaga(action: any): any {
  try {
    const response = yield call(api.put, '/api/profile', action.payload);
    const user = response.data as types.userData;
    yield call([AsyncStorage, 'setItem'], 'user', JSON.stringify(user));
    yield put(actions.updateProfileSuccess(user));
  } catch (e: any) {
    yield put(
      actions.authFailure(e.response?.data?.message || 'Update failed'),
    );
  }
}

//Logout Worker Saga
function* logoutSaga() {
  try {
    yield call([AsyncStorage, 'removeItem'], 'token');
    yield call([AsyncStorage, 'removeItem'], 'user');
    yield put(actions.clearAuth());
  } catch (e) {
    console.log('Error during logout:', e);
    yield put(actions.clearAuth());
  }
}

export function* watchAuth() {
  yield takeLatest('auth/LOAD_TOKEN_REQUEST', loadTokenSaga);
  yield takeLatest('auth/LOGIN_REQUEST', loginSaga);
  yield takeLatest('auth/REGISTER_REQUEST', registerSaga);
  yield takeLatest('auth/UPDATE_PROFILE_REQUEST', updateProfileSaga);
  yield takeLatest('auth/LOGOUT_REQUEST', logoutSaga);
}
