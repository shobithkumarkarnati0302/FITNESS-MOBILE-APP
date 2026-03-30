import * as types from '../types/authTypes';

const initialState: types.userState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authReducer = (state: types.userState = initialState, action: any,): types.userState => {

  if (action.type === 'auth/LOGIN_REQUEST') {
    return {
      ...state,
      loading: true,
      error: null,
    };
  } 
  
  else if (action.type === 'auth/REGISTER_REQUEST') {
    return {
      ...state,
      loading: true,
      error: null,
    };
  } 

  else if (action.type === 'auth/LOGOUT_REQUEST') {
    return {
      ...state,
      loading: true,
      error: null,
    };
  } 

  else if (action.type === 'auth/UPDATE_PROFILE_REQUEST') {
    return {
      ...state,
      loading: true,
      error: null,
    };
  } 

  else if (action.type === 'auth/LOAD_TOKEN_REQUEST') {
    return {
      ...state,
      loading: true,
      error: null,
    };
  } 

  else if (action.type === 'auth/AUTH_SUCCESS') {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      loading: false,
      error: null,
    };
  } 

  else if (action.type === 'auth/UPDATE_PROFILE_SUCCESS') {
    return {
      ...state,
      user: action.payload,
      loading: false,
    };
  } 

  else if (action.type === 'auth/AUTH_FAILURE') {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  } 

  else if (action.type === 'auth/CLEAR_AUTH') {
    return {
      ...state,
      user: null,
      token: null,
      loading: false,
      error: null,
    };
  } 
  
  else if (action.type === 'auth/SET_LOADING') {
    return {
      ...state,
      loading: action.payload,
    };
  } 
  else {
    return state;
  }
};

export default authReducer;
