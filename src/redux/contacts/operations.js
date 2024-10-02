import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContacts = createAsyncThunk(
    "contacts/getAll", async (_, thunkAPI) => {
        try {
            const { data } = await axios.get("/contacts");
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addContact = createAsyncThunk(
    "contacts/addContact", async (newContact, thunkAPI) => {
        try {
            const { data } = await axios.post("/contacts", newContact);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact", async (contactId, thunkAPI) => {
        try {
            const { data } = await axios.delete(`contacts/${contactId}`);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact", 
  async ({ contactId, updates }, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/contacts/${contactId}`, updates);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
