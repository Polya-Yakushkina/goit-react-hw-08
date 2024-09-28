import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


axios.defaults.baseURL = "https://connections-api.goit.global/";

const setAuthHeader = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = ``;
};

export const register = createAsyncThunk("auth/register", async (credencials, thunkAPI) => {
    try {
        const { data } = await axios.post("/users/signup", credencials);
        setAuthHeader(data.token);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const logIn = createAsyncThunk("auth/login", async (credencials, thunkAPI) => {
    try {
        const { data } = await axios.post("/users/login", credencials);
        setAuthHeader(data.token);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await axios.post("/users/logout");
        clearAuthHeader();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const refreshUser = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    setAuthHeader(reduxState.auth.token);
    const { data } = await axios.get("/users/current");
    return data;
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.token !== null;
    },
  }
);

// export const refreshUser = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
//   const storedToken = thunkAPI.getState().auth.token;
//   if (!storedToken) return thunkAPI.rejectWithValue("An unexpected error occurred.");
//   setAuthHeader(storedToken);

//   try {
//     const { data } = await axios.get("/users/current");
//     return data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });