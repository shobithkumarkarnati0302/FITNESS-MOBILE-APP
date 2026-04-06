import * as types from './favTypes';

export const toggleFavoriteRequest = (exercise: types.Exercise) => ({
  type: 'fav/toggleFavoriteRequest',
  payload: exercise,
});

export const setFavorites = (favorites: types.Exercise[]) => ({
  type: 'fav/setFavorites',
  payload: favorites,
});

export const setFavoriteError = (error: string) => ({
  type: 'fav/setFavoriteError',
  payload: error,
});
