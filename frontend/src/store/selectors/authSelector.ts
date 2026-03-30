export const selectUser        = (state: any) => state.auth.user;
export const selectToken       = (state: any) => state.auth.token;
export const selectAuthLoading = (state: any) => state.auth.loading;
export const selectAuthError   = (state: any) => state.auth.error;