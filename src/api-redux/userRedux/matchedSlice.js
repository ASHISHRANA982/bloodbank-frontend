
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import Cookies from "js-cookie";


export const fetchMatched = createAsyncThunk(
  "matched/fetchMatched",
  async (_,thunkAPI) => {
    try {
      const requestId=Cookies.get("requestId")
      
      const res = await api.get(
        `/userProfile/requestedInfo/${requestId}`
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Unable to load matched results.");
    }
  }
);


export const checkStatus = createAsyncThunk(
  "matched/checkStatus",
  async (allStatusIds, thunkAPI) => {
    try {
      const res = await api.post("/userProfile/checkStatus", allStatusIds);
      console.log("check status called");
      
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Status update failed");
    }
  }
);

export const chooseDelivery = createAsyncThunk(
  "matched/chooseDelivery",
  async (allStatusIds, thunkAPI) => {
    try {
      const res = await api.put("userProfile/chooseDelivery", allStatusIds);
      console.log("choose delivery api call :",data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Delivery choice failed");
    }
  }
);


// matchedSlice
const matchedSlice = createSlice({
  name: "matched",
  initialState: {
    loading: false,
    data: null,
    error: "",
    checkStatusResponse: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatched.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchMatched.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMatched.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkStatus.fulfilled, (state, action) => {
        state.checkStatusResponse = action.payload;
      })
      .addCase(checkStatus.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(chooseDelivery.fulfilled, (state, action) => {
    state.chooseDeliveryResponse = action.payload;
  })
  .addCase(chooseDelivery.rejected, (state, action) => {
    state.error = action.payload;
  });
  
  },
});

export default matchedSlice.reducer;
