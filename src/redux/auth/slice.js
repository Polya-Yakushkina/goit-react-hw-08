import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { logIn, logOut, refreshUser, register } from "./operations";

const initialState = {
    user: {
        name: null,
        email: null,
    },
    token: null,
    isLoggedIn: false,
    isLoading: false,
    isRefreshing: false,
    isError: false,
    errorMessage: "", // Додано
    emailError: false, // Додано
    passwordError: false, // Додано
};

const slice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.token = payload.token;
                state.isLoggedIn = true;
            })
            .addCase(logIn.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.token = payload.token;
                state.isLoggedIn = true;
            })
            .addCase(logOut.fulfilled, () => {
                return initialState;
            })
            .addCase(refreshUser.pending, (state) => {
                state.isRefreshing = true;
            })
            .addCase(refreshUser.fulfilled, (state, { payload }) => {
                state.user = payload;
                state.isRefreshing = false;
                state.isLoggedIn = true;
            })
            .addCase(refreshUser.rejected, (state, { payload }) => {
                state.isRefreshing = false;
                // state.isError = payload;
                state.isError = true; // Замінено
                state.errorMessage = payload; // Додано
            })
            .addMatcher(isAnyOf(register.pending, logIn.pending), (state) => {
                state.isLoading = true;
            })
            .addMatcher(isAnyOf(register.rejected, logIn.rejected), (state, { payload }) => {
                state.isLoading = false;
                // state.isError = payload;
                state.isError = true; // Замінено
                state.errorMessage = payload; // Додано
                if (payload.includes("email")) { // Додано
                    state.emailError = true; // Додано
                }
                if (payload.includes("password")) { // Додано
                    state.passwordError = true; // Додано
                }
            })
            .addMatcher(isAnyOf(register.fulfilled, logIn.fulfilled), (state) => {
                state.emailError = false;
                state.passwordError = false;
            });
    }
});

export default slice.reducer;