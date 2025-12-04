import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api"; 


export const registerBloodBank = createAsyncThunk(
  "bloodBank/register",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/bloodbank/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Registration failed"
      );
    }
  }
);

const bloodBankSlice = createSlice({
  name: "bloodBank",
  initialState: {
    loading: false,
    successMessage: null,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerBloodBank.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerBloodBank.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(registerBloodBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = bloodBankSlice.actions;
export default bloodBankSlice.reducer;
