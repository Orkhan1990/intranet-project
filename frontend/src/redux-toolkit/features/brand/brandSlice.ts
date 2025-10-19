// brandSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BrandInterface } from "../../../types";
import { getBrandDatas } from "../../../api/allApi";

interface BrandState {
  brands: BrandInterface[];
  loading: boolean;
  error: string | null;
}

const initialState: BrandState = {
  brands: [],
  loading: false,
  error: null,
};

export const fetchBrands = createAsyncThunk(
  "brand/fetchBrands",
  async (_, thunkAPI) => {
    try {
      const data = await getBrandDatas();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default brandSlice.reducer;
