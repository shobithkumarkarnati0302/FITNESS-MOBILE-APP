import * as types from '../types/favTypes';

const initialState: types.favState = {
  favorites: [],
  loading: false,
  error: null,
};

const favReducer = (
  state: types.favState = initialState,
  action: any,
): types.favState => {
  if (action.type === 'fav/TOGGLE_FAVORITE_REQUEST') {
    return {
      ...state,
      loading: true,
      error: null,
    };
  } else if (action.type === 'fav/SET_FAVORITES') {
    return {
      ...state,
      favorites: action.payload,
      loading: false,
      error: null,
    };
  } else if (action.type === 'auth/AUTH_SUCCESS') {
    return {
      ...state,
      favorites: action.payload.user?.favorites || [],
      loading: false,
      error: null,
    };
  } else if (action.type === 'auth/CLEAR_AUTH') {
    return {
      ...state,
      favorites: [],
      loading: false,
      error: null,
    };
  } else if (action.type === 'fav/SET_ERROR') {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  } else {
    return state;
  }
};

export default favReducer;
