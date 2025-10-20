import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ClientInterface } from "../../../types";
import { getClientsData } from "../../../api/allApi";

interface ClientState {
  clients: ClientInterface[];
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  loading: false,
  error: null,
};

export const fetchClients = createAsyncThunk(
  "client/fetchClients",
  async (_, thunkAPI) => {
    try {
      const data = await getClientsData();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default clientSlice.reducer;