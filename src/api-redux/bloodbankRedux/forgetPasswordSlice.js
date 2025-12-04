import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// SEND OTP
export const requestOtp = createAsyncThunk(
  "forgotPassword/requestOtp",
  async (licenceNo, thunkAPI) => {
    try {
      const response = await api.post("/bloodbank/requestOtp", { licenceNo });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to send OTP");
    }
  }
);

// UPDATE LOGIN (NEW USERNAME + NEW PASSWORD)
export const updateLogin = createAsyncThunk(
  "forgotPassword/updateLogin",
  async ({ licenceNo, newUsername, newPassword, otp }, thunkAPI) => {
    try {
      const response = await api.put("/bloodbank/updateLogin", {
        loginClass: {
          licenceNo,
          newUsername,
          newPassword
        },
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
      // OTP REQUEST
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
        state.error = action.payload.message || action.payload;
      })

      // UPDATE LOGIN
      .addCase(updateLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.otpSent = false; // reset after success
      })
      .addCase(updateLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.payload;
      });
  },
});

export const { resetForgotPassword } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
