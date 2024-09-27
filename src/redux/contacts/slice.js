import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact, updateContact } from "./operations";

const handlePending = (state) => {
    state.loading = true;
    state.error = false;
}

const handleRejected = (state, { payload }) => {
    state.loading = false;
    state.error = payload;
}

const slice = createSlice({
    name: "contacts",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, (state, { payload }) => {
                state.items = payload;
                state.loading = false;
            })
            .addCase(fetchContacts.rejected, handleRejected)
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.fulfilled, (state, { payload }) => {
                state.items.push(payload);
                state.loading = false;
            })
            .addCase(addContact.rejected, handleRejected)
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, (state, { payload }) => {
                state.items = state.items.filter((item) => item.id !== payload.id);
                state.loading = false;
            })
            .addCase(deleteContact.rejected, handleRejected)
            .addCase(updateContact.pending, handlePending)
            .addCase(updateContact.fulfilled, (state, { payload }) => {
                const index = state.items.findIndex(item => item.id === payload.id);
                if (index !== -1) { state.items[index] = payload; }
                state.loading = false;
            })
            .addCase(updateContact.rejected, handleRejected);
    }
});

export default slice.reducer;
