
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";


export const requestOtp = createAsyncThunk(
  "forgotPassword/requestOtp",
  async (aadhar, thunkAPI) => {
    try {
      const response = await api.post("/donor/requestOtp", { aadhar });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to send OTP");
    }
  }
);


export const updateLogin = createAsyncThunk(
  "forgotPassword/updateLogin",
  async ({ aadhar, username, password, otp }, thunkAPI) => {
    try {
      const response = await api.put("/donor/updateLogin", {
        loginClass: { aadharNo: aadhar, username, password },
        otp
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to update login");
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  message: null,
  otpSent: false,
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    resetForgotPassword: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.otpSent = false;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(requestOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.otpSent = true;
      })
      .addCase(requestOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Login
      .addCase(updateLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(updateLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetForgotPassword } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;

