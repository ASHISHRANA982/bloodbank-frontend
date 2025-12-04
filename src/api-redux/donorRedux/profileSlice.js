import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import Cookies from "js-cookie";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get("donorToken");
      const res = await api.get("/DonorProfile/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to load profile");
    }
  }
);

export const fetchStatus = createAsyncThunk(
  "profile/fetchStatus",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get("donorToken");
      const res = await api.get("/DonorProfile/status", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to load status");
    }
  }
);

export const updateDonorStatus = createAsyncThunk(
  "profile/updateDonorStatus",
  async (dsId, thunkAPI) => {
    try {
      const token = Cookies.get("donorToken");
      await api.put(`/DonorProfile/updateStatus/${dsId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return dsId;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to update status");
    }
  }
);

export const cancelRequest = createAsyncThunk(
  "profile/cancelRequest",
  async (id, thunkAPI) => {
    try {
      const token = Cookies.get("donorToken");
      await api.put(`/DonorProfile/cancelRequest/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to cancel request");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    statusList: [],
    loading: false,
    error: null,
    loadingStatus: false,
    errorStatus: null,
    updating: false,
    updateError: null,
    canceling: false,
    cancelError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchStatus.pending, (state) => {
        state.loadingStatus = true;
        state.errorStatus = null;
      })
      .addCase(fetchStatus.fulfilled, (state, action) => {
        state.loadingStatus = false;
        state.statusList = action.payload;
      })
      .addCase(fetchStatus.rejected, (state, action) => {
        state.loadingStatus = false;
        state.errorStatus = action.payload;
      })
      .addCase(updateDonorStatus.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateDonorStatus.fulfilled, (state, action) => {
        state.updating = false;
        const id = action.payload;
        state.statusList = state.statusList.map((item) =>
          item.id === id ? { ...item, availability: "ACCEPTED" } : item
        );
      })
      .addCase(updateDonorStatus.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload;
      })
      .addCase(cancelRequest.pending, (state) => {
        state.canceling = true;
        state.cancelError = null;
      })
      .addCase(cancelRequest.fulfilled, (state, action) => {
        state.canceling = false;
        const removedId = action.payload;
        state.statusList = state.statusList.filter((item) => item.id !== removedId);
      })
      .addCase(cancelRequest.rejected, (state, action) => {
        state.canceling = false;
        state.cancelError = action.payload;
      });
  },
});

export default profileSlice.reducer;
