import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { logIn, logOut, refreshUser, register } from "./operations";

const initialState = {
    user: {
        name: null,
        email: null,
    },
    token: null,
    isLoggedIn: null,
    isLoading: false,
    isRefreshing: false,
    isError: false,
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
            .addMatcher(isAnyOf(register.pending, logIn.pending), (state) => {
                state.isLoading = true;
            })
            .addMatcher(isAnyOf(register.rejected, logIn.rejected), (state, { payload }) => {
                state.isLoading = false;
                state.isError = payload;
        })
    }
});

export default slice.reducer;