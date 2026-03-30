import * as types from '../types/authTypes';

export const loginRequest = (data: any) => ({
  type: 'auth/LOGIN_REQUEST',
  payload: data,
});

export const registerRequest = (userData: any) => ({
  type: "auth/REGISTER_REQUEST",
  payload: userData,
});

export const logoutRequest = () => ({
  type: "auth/LOGOUT_REQUEST",
});

export const updateProfileRequest = (data: any) => ({
  type: "auth/UPDATE_PROFILE_REQUEST",
  payload: data,
});

export const loadTokenRequest = () => ({
  type: "auth/LOAD_TOKEN_REQUEST",
});

export const authSuccess = (payload: types.AuthSuccess) => ({
  type: "auth/AUTH_SUCCESS",
  payload,
});

export const updateProfileSuccess = (user: types.userData) => ({
  type: "auth/UPDATE_PROFILE_SUCCESS",
  payload: user,
});


export const authFailure = (error: string) => ({
  type: "auth/AUTH_FAILURE",
  payload: error,
});

export const clearAuth = () => ({
  type: "auth/CLEAR_AUTH",
});

export const setLoading = (isLoading: boolean) => ({
  type: "auth/SET_LOADING",
  payload: isLoading,
});
