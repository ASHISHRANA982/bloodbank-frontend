import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const searchBlood = createAsyncThunk(
  "blood/searchBlood",
  async (payload, thunkAPI) => {
    try {
      const res = await api.post("/home/page/searchBlood", payload);
      return res.data;
    } catch (err) {
      const backendMessage =
        err.response?.data?.message || "Search failed. Try again.";

      return thunkAPI.rejectWithValue(backendMessage);
    }
  }
);

const searchBloodSlice = createSlice({
  name: "blood",
  initialState: {
    loading: false,
    searchResult: null,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(searchBlood.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBlood.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResult = action.payload;
      })
      .addCase(searchBlood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export default searchBloodSlice.reducer;
