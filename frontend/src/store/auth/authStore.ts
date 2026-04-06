import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as types from './authTypes';

const initialState: types.userState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isInitializing: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state, _action: PayloadAction<types.LoginCredentials>) {
      state.loading = true;
      state.error = null;
    },
    registerRequest(state, _action: PayloadAction<types.RegisterCredentials>) {
      state.loading = true;
      state.error = null;
    },
    logoutRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updateProfileRequest(state, _action: PayloadAction<types.UpdateProfileCredentials>) {
      state.loading = true;
      state.error = null;
    },
    loadTokenRequest(state) {
      state.loading = true;
      state.error = null;
    },

    authSuccess(state, action: PayloadAction<types.AuthSuccess>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
      state.isInitializing = false;
    },
    updateProfileSuccess(state, action: PayloadAction<types.userData>) {
      state.user = action.payload;
      state.loading = false;
    },
    authFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.isInitializing = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  loginRequest,
  registerRequest,
  logoutRequest,
  updateProfileRequest,
  loadTokenRequest,
  authSuccess,
  updateProfileSuccess,
  authFailure,
  clearAuth,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;
