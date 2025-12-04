import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../services/api";


export const loginBloodbank = createAsyncThunk(
  "auth/loginBloodbank",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await api.post("/bloodbank/login", { username, password });

       if (Cookies.get("donorToken")) Cookies.remove("donorToken");

      Cookies.set("bloodbankToken", response.data, { expires: 7 });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);



export const logoutBloodbank = createAsyncThunk(
  "auth/LogoutBloodbank",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get("bloodbankToken");
      if (!token) return;

      await api.post(
        "/BloodbankProfile/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Cookies.remove("bloodbankToken");
      return "Logout successful";
    } catch (error) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);


const initialState = {
  user: Cookies.get("bloodbankToken") || null,
  loading: false,
  error: null,
  message: null,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserFromCookie: (state) => {
      const token = Cookies.get("bloodbankToken");
      if (token) state.user = token;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder


      .addCase(loginBloodbank.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginBloodbank.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginBloodbank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(logoutBloodbank.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.isLoggedOut = false;
      })
      .addCase(logoutBloodbank.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.message = action.payload;
        state.isLoggedOut = true; 
      })
      .addCase(logoutBloodbank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedOut = false;
      });
  },
});

export const { setUserFromCookie, clearUser } = loginSlice.actions;
export default loginSlice.reducer;
