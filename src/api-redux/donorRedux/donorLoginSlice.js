import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../services/api";


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await api.post("/donor/login", { username, password });

       if (Cookies.get("bloodbankToken")) Cookies.remove("bloodbankToken");
      
      Cookies.set("donorToken", response.data, { expires: 7 });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);



const initialState = {
  user: Cookies.get("donorToken") || null, 
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserFromCookie: (state) => {
      const token = Cookies.get("donorToken");
      if (token) state.user = token;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserFromCookie, clearUser } = loginSlice.actions;
export default loginSlice.reducer;
