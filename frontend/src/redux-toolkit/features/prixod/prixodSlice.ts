import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPrixodById, getPrixodsData } from "../../../api/allApi";
import { EditPrixodInterface, PrixodInterface } from "../../../types";

interface PrixodState {
  prixods: PrixodInterface[];
  prixod: EditPrixodInterface | null;
  loading: boolean;
  error: string | null;
}

const initialState: PrixodState = {
  prixods: [],
  prixod: null,
  loading: false,
  error: null,
};

export const fetchPrixods = createAsyncThunk(
  "prixod/fetchPrixods",
  async (_, thunkAPI) => {
    try {
      const data = await getPrixodsData();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPrixodById = createAsyncThunk(
  "prixod/fetchPrixodById",
  async (id: number, thunkAPI) => {
    try {
      const data = await getPrixodById(id);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const prixodSlice = createSlice({
  name: "prixod",
  initialState,
  reducers: {},
extraReducers: (builder) => {
  builder
    // Existing list logic
    .addCase(fetchPrixods.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchPrixods.fulfilled, (state, action) => {
      state.loading = false;
      state.prixods = action.payload;
    })
    .addCase(fetchPrixods.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    // ✅ Single prixod
    .addCase(fetchPrixodById.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.prixod = null;
    })
    .addCase(fetchPrixodById.fulfilled, (state, action) => {
      state.loading = false;
      state.prixod = action.payload;
    })
    .addCase(fetchPrixodById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.prixod = null;
    });
}

});

export default prixodSlice.reducer;