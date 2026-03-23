import { call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/axios';
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
} from '../slices/authSlice';

function* loadTokenSaga() {
  try {
    const token = yield call([AsyncStorage, 'getItem'], 'token');
    const user = yield call([AsyncStorage, 'getItem'], 'user');
    if (token && user) {
      yield put(authSuccess({ token, user: JSON.parse(user) }));
    } else {
      yield put(clearAuth());
    }
  } catch (e) {
    yield put(clearAuth());
  }
}

function* loginSaga(action: any) {
  try {
    const response = yield call(api.post, '/auth/login', action.payload);
    const { token, user } = response.data;
    yield call([AsyncStorage, 'setItem'], 'token', token);
    yield call([AsyncStorage, 'setItem'], 'user', JSON.stringify(user));
    yield put(authSuccess({ token, user }));
  } catch (e: any) {
    yield put(authFailure(e.response?.data?.message || 'Login failed'));
  }
}

function* registerSaga(action: any) {
  try {
    const response = yield call(api.post, '/auth/register', action.payload);
    const { token, user } = response.data;
    yield call([AsyncStorage, 'setItem'], 'token', token);
    yield call([AsyncStorage, 'setItem'], 'user', JSON.stringify(user));
    yield put(authSuccess({ token, user }));
  } catch (e: any) {
    yield put(authFailure(e.response?.data?.message || 'Registration failed'));
  }
}

function* updateProfileSaga(action: any) {
  try {
    const response = yield call(api.put, '/api/profile', action.payload);
    const user = response.data;
    yield call([AsyncStorage, 'setItem'], 'user', JSON.stringify(user));
    yield put(updateProfileSuccess(user));
  } catch (e: any) {
    yield put(authFailure(e.response?.data?.message || 'Update failed'));
  }
}

function* logoutSaga() {
  try {
    yield call([AsyncStorage, 'removeItem'], 'token');
    yield call([AsyncStorage, 'removeItem'], 'user');
    yield put(clearAuth());
  } catch (e) {
    yield put(clearAuth());
  }
}

export function* watchAuth() {
  yield takeLatest(loadTokenRequest.type, loadTokenSaga);
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(registerRequest.type, registerSaga);
  yield takeLatest(updateProfileRequest.type, updateProfileSaga);
  yield takeLatest(logoutRequest.type, logoutSaga);
}
