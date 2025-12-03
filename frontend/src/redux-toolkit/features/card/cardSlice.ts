import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { filterTheCardsAPI } from "../../../api/allApi";

export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (filters: any) => {
    const response = await filterTheCardsAPI(filters);
    return response.data;
  }
);

interface CardsState {
  loading: boolean;
  cards: any[];
  error: string | null;
}

const initialState: CardsState = {
  loading: false,
  cards: [],
  error: null,
};
const cardsSlice = createSlice({
  name: "cards",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload; // 🔥 nəticə BURADA saxlanır
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export default cardsSlice.reducer;
