export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectEmailError = (state) => state.auth.emailError;
export const selectPasswordError = (state) => state.auth.passwordError;

