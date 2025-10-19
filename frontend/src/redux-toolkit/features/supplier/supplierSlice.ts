import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SupplierInterface } from '../../../types';
import { getSupplierDatas } from '../../../api/allApi';

interface SupplierState {
  suppliers: SupplierInterface[];
  loading: boolean;
  error: string | null;
}

const initialState: SupplierState = {
  suppliers: [],
  loading: false,
  error: null,
};

export const fetchSuppliers = createAsyncThunk(
  'supplier/fetchSuppliers',
  async (_, thunkAPI) => {
    try {
      const data = await getSupplierDatas(); // ✅ use external function
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default supplierSlice.reducer;
