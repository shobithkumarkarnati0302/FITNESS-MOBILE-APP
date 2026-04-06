import { Exercise } from '../favorite/favTypes';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  height: number;
  weight: number;
  age: number;
  gender: string;
  plan?: string;
}

export interface UpdateProfileCredentials {
  name: string;
  height: number;
  weight: number;
  age: number;
  gender: string;
  plan: string;
}

export interface userData {
  name: string;
  email: string;
  height: number;
  weight: number;
  age: number;
  gender: string;
  plan?: string;
  favorites?: Exercise[];
  subscriptionStartDate?: string;
}

export interface AuthSuccess {
  token: string;
  user: userData;
}

export interface userState {
  user: userData | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isInitializing: boolean;
}
