
export const toggleFavoriteRequest = (exercise: any) => ({
  type: 'fav/TOGGLE_FAVORITE_REQUEST',
  payload: exercise,
});
export const setFavorites = (favorites: any[]) => ({
  type: 'fav/SET_FAVORITES',
  payload: favorites,
});

export const setFavoriteError = (error: string) => ({
  type: 'fav/SET_ERROR',
  payload: error,
});
