import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  user: null as any,
  token: null as string | null,
  loading: false,
  error: null as string | null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: state => {
      state.loading = true;
      state.error = null;
    },
    registerRequest: state => {
      state.loading = true;
      state.error = null;
    },
    logoutRequest: state => {
      state.loading = true;
    },
    updateProfileRequest: state => {
      state.loading = true;
    },
    loadTokenRequest: state => {
      state.loading = true;
    },
    
    authSuccess: (state,action: PayloadAction<{ user: any; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    updateProfileSuccess: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.loading = false;
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAuth: state => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
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
