import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact, updateContact } from "./operations";

const slice = createSlice({
    name: "contacts",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            // get All Contacts
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchContacts.fulfilled, (state, { payload }) => {
                state.items = payload;
                state.loading = false;
            })
            .addCase(fetchContacts.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            // Add Contact
            .addCase(addContact.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(addContact.fulfilled, (state, { payload }) => {
                state.items.push(payload);
                state.loading = false;
            })
            .addCase(addContact.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            // Delete Contact
            .addCase(deleteContact.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deleteContact.fulfilled, (state, { payload }) => {
                state.items = state.items.filter((item) => item.id !== payload.id);
                state.loading = false;
            })
            .addCase(deleteContact.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            // Update Contact
            .addCase(updateContact.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(updateContact.fulfilled, (state, { payload }) => {
                const index = state.items.findIndex(item => item.id === payload.id);
                if (index !== -1) {
                    state.items[index] = payload;
                }
                state.loading = false;
            })
            .addCase(updateContact.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    }
});

export default slice.reducer;


// import { createSlice } from "@reduxjs/toolkit";
// import { fetchContacts, addContact, deleteContact, updateContact } from "./operations";

// const handlePending = (state) => {
//     state.loading = true;
//     state.error = false;
// }

// const handleRejected = (state, { payload }) => {
//     state.loading = false;
//     state.error = payload;
// }

// const slice = createSlice({
//     name: "contacts",
//     initialState: {
//         items: [],
//         loading: false,
//         error: null,
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchContacts.pending, handlePending)
//             .addCase(fetchContacts.fulfilled, (state, { payload }) => {
//                 state.items = payload;
//                 state.loading = false;
//             })
//             .addCase(fetchContacts.rejected, handleRejected)
//             .addCase(addContact.pending, handlePending)
//             .addCase(addContact.fulfilled, (state, { payload }) => {
//                 state.items.push(payload);
//                 state.loading = false;
//             })
//             .addCase(addContact.rejected, handleRejected)
//             .addCase(deleteContact.pending, handlePending)
//             .addCase(deleteContact.fulfilled, (state, { payload }) => {
//                 state.items = state.items.filter((item) => item.id !== payload.id);
//                 state.loading = false;
//             })
//             .addCase(deleteContact.rejected, handleRejected)
//             .addCase(updateContact.pending, handlePending)
//             .addCase(updateContact.fulfilled, (state, { payload }) => {
//                 const index = state.items.findIndex(item => item.id === payload.id);
//                 if (index !== -1) { state.items[index] = payload; }
//                 state.loading = false;
//             })
//             .addCase(updateContact.rejected, handleRejected);
//     }
// });

// export default slice.reducer;
