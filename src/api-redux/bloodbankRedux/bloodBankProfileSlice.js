

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../services/api";


export const getBloodBankProfile = createAsyncThunk(
  "bloodBank/getProfile",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get("bloodbankToken");
      if (!token) return thunkAPI.rejectWithValue("No token found");

      const res = await api.get("/BloodbankProfile/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (err) {
      const payload = err.response?.data;
      return thunkAPI.rejectWithValue(
        payload?.message || payload || "Failed to load profile"
      );
    }
  }
);


export const getBloodBankStatus = createAsyncThunk(
  "bloodBank/getStatus",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get("bloodbankToken");
      if (!token) return thunkAPI.rejectWithValue("No token found");

      const res = await api.get("/BloodbankProfile/status", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (err) {
      const payload = err.response?.data;
      return thunkAPI.rejectWithValue(
        payload?.message || payload || "Failed to load status"
      );
    }
  }
);



export const acceptRequest = createAsyncThunk(
  "bloodBank/acceptRequest",
  async ({ bsId, bloodId }, thunkAPI) => {
    try {
      const token = Cookies.get("bloodbankToken");
      if (!token) return thunkAPI.rejectWithValue("No token found");

      const res = await api.put(
        `/BloodbankProfile/updateStatus/${bsId}`,
        { bloodId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      thunkAPI.dispatch(getBloodBankStatus());
      return res.data;
    } catch (err) {
      const payload = err.response?.data;
      return thunkAPI.rejectWithValue(
        payload?.message || payload || "Failed to accept request"
      );
    }
  }
);



export const cancelRequest = createAsyncThunk(
  "bloodBank/cancelRequest",
  async (id, thunkAPI) => {
    try {
      const token = Cookies.get("bloodbankToken");
      if (!token) return thunkAPI.rejectWithValue("No token found");

      const res = await api.put(
        `/BloodbankProfile/cancelRequest/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      thunkAPI.dispatch(getBloodBankStatus());
      return res.data;
    } catch (err) {
      const payload = err.response?.data;
      return thunkAPI.rejectWithValue(
        payload?.message || payload || "Failed to cancel request"
      );
    }
  }
);



const bloodBankSlice = createSlice({
  name: "bloodBankProfile",

  initialState: {
    statusLoading: false,
    statusError: null,
    statusList: [],

    profileLoading: false,
    profileError: null,
    profileData: null,

    actionLoading: false,
    actionError: null,
    actionMessage: null,
  },

  reducers: {
    clearActionState(state) {
      state.actionLoading = false;
      state.actionError = null;
      state.actionMessage = null;
    },
  },

  extraReducers: (builder) => {
    /* ---- PROFILE ---- */
    builder
      .addCase(getBloodBankProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(getBloodBankProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profileData = action.payload;
      })
      .addCase(getBloodBankProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload;
      });

    /* ---- STATUS ---- */
    builder
      .addCase(getBloodBankStatus.pending, (state) => {
        state.statusLoading = true;
        state.statusError = null;
      })
      .addCase(getBloodBankStatus.fulfilled, (state, action) => {
        state.statusLoading = false;
        state.statusList = action.payload || [];
      })
      .addCase(getBloodBankStatus.rejected, (state, action) => {
        state.statusLoading = false;
        state.statusError = action.payload;
      });

    /* ---- ACCEPT ---- */
    builder
      .addCase(acceptRequest.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
        state.actionMessage = null;
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.actionMessage = action.payload || "Accepted";
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      });

    /* ---- CANCEL ---- */
    builder
      .addCase(cancelRequest.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
        state.actionMessage = null;
      })
      .addCase(cancelRequest.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.actionMessage = action.payload || "Cancelled";
      })
      .addCase(cancelRequest.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      });
  },
});

export const { clearActionState } = bloodBankSlice.actions;

export default bloodBankSlice.reducer;
