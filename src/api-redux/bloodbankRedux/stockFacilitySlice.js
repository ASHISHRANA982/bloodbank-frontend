import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import Cookies from "js-cookie";



export const getStocks = createAsyncThunk(
  "bloodBank/getStocks",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get("bloodbankToken");

      const res = await api.get("/Bloodbank/displayStock", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to load stocks");
    }
  }
);


export const addStock = createAsyncThunk(
  "bloodBank/addStock",
  async (payload, thunkAPI) => {
    try {
      const token = Cookies.get("bloodbankToken");

      const res = await api.post("/Bloodbank/addStock", payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to add stock");
    }
  }
);


export const updateStock = createAsyncThunk(
  "bloodBank/updateStock",
  async ({ id, quantity }, thunkAPI) => {
    try {
      const token = Cookies.get("bloodbankToken");

      const res = await api.put(`/Bloodbank/updateStock/${id}`, {
        quantity,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to update stock");
    }
  }
);


export const deleteStock = createAsyncThunk(
  "bloodBank/deleteStock",
  async (id, thunkAPI) => {
    try {
      const token = Cookies.get("bloodbankToken");

      const res = await api.delete(`/Bloodbank/deleteStock/${id}`,
         {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to delete stock");
    }
  }
);


export const getFacilities = createAsyncThunk(
  "bloodBank/getFacilities",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get("bloodbankToken");


      const res = await api.get("/Bloodbank/displayFacility", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to load facilities");
    }
  }
);


export const deleteFacility = createAsyncThunk(
  "bloodBank/deleteFacility",
  async (id, thunkAPI) => {
    try {

      const token = Cookies.get("bloodbankToken");

      const res = await api.delete(`/Bloodbank/removeFacility/${id}`,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to delete facility");
    }
  }
);



const stockFacilitySlice = createSlice({
  name: "stockFacility",
  initialState: {
    stocks: [],
    facilities: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearMessage(state) {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getStocks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.stocks = action.payload;
      })
      .addCase(getStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addStock.fulfilled, (state, action) => {
        state.message = action.payload;
      })

      .addCase(updateStock.fulfilled, (state, action) => {
        state.message = action.payload;
      })

      .addCase(deleteStock.fulfilled, (state, action) => {
        state.message = action.payload;
      })


      .addCase(getFacilities.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFacilities.fulfilled, (state, action) => {
        state.loading = false;
        state.facilities = action.payload;
      })
      .addCase(getFacilities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteFacility.fulfilled, (state, action) => {
        state.message = action.payload;
      });
  },
});

export const { clearMessage } = stockFacilitySlice.actions;
export default stockFacilitySlice.reducer;
