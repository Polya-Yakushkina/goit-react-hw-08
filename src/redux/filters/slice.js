import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "filters",
    initialState: {
        query: "",
    },
    reducers: {
        changeFilter: (state, { payload }) => {
            state.query = payload;
        },
    },
});

export const { changeFilter } = slice.actions;
export default slice.reducer;