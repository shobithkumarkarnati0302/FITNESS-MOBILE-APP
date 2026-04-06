import * as types from './authTypes';

export const loginRequest = (data: types.LoginCredentials) => ({
  type: 'auth/loginRequest',
  payload: data,
});

export const registerRequest = (data: types.RegisterCredentials) => ({
  type: 'auth/registerRequest',
  payload: data,
});

export const logoutRequest = () => ({
  type: 'auth/logoutRequest',
});

export const updateProfileRequest = (data: types.UpdateProfileCredentials) => ({
  type: 'auth/updateProfileRequest',
  payload: data,
});

export const loadTokenRequest = () => ({
  type: 'auth/loadTokenRequest',
});

export const authSuccess = (payload: types.AuthSuccess) => ({
  type: 'auth/authSuccess',
  payload,
});

export const updateProfileSuccess = (user: types.userData) => ({
  type: 'auth/updateProfileSuccess',
  payload: user,
});

export const authFailure = (error: string) => ({
  type: 'auth/authFailure',
  payload: error,
});

export const clearAuth = () => ({
  type: 'auth/clearAuth',
});

export const setLoading = (isLoading: boolean) => ({
  type: 'auth/setLoading',
  payload: isLoading,
});
