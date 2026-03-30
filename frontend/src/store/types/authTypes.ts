export interface userData {
  name: string;
  email: string;
  height: number;
  weight: number;
  age: number;
  gender: string;
  plan?: string;
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
}

