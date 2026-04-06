import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as types from './favTypes';
import { authSuccess, clearAuth } from '../auth/authStore';

const initialState: types.favState = {
  favorites: [],
  loading: false,
  error: null,
};

const favSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {
    toggleFavoriteRequest(state, _action: PayloadAction<types.Exercise>) {
      state.loading = true;
      state.error = null;
    },
    setFavorites(state, action: PayloadAction<types.Exercise[]>) {
      state.favorites = action.payload;
      state.loading = false;
      state.error = null;
    },

    setFavoriteError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(authSuccess, (state, action) => {
        state.favorites = action.payload.user?.favorites ?? [];
        state.loading = false;
        state.error = null;
      })
      .addCase(clearAuth, state => {
        state.favorites = [];
        state.loading = false;
        state.error = null;
      });
  },
});

export const { toggleFavoriteRequest, setFavorites, setFavoriteError } =
  favSlice.actions;

export default favSlice.reducer;
