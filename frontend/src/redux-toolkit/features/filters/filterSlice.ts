import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterTheCardsAPI } from "../../../api/allApi";

interface FilterState {
  cardStatus: "" | "all" | "open" | "closed";
  cardNumber: string;
  banNumber: string;
  paymentType: string;
  clientId: string;
  manufactured: string;
  workerId: string;
  receptionId: string;
  minAmount: number | "";
  maxAmount: number | "";
  customerType: string;
  legalOrPhysical: string;
  carNumber: string;
  activeTab: string | null;
}

const initialState: FilterState = {
  cardStatus: "",
  cardNumber: "",
  banNumber: "",
  paymentType: "",
  clientId: "",
  manufactured: "",
  workerId: "",
  receptionId: "",
  minAmount: "",
  maxAmount: "",
  customerType: "",
  legalOrPhysical: "",
  carNumber: "",
  activeTab: "İş kartı",
};

export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (filters: any) => {
    const response = filterTheCardsAPI(filters);
    return response;
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<FilterState>>) => {
      Object.assign(state, action.payload);
    },
    setActiveTab: (state, action: PayloadAction<string | null>) => {
      state.activeTab = action.payload;
    },
    resetFilter: () => ({ ...initialState }), // <-- DÜZGÜN HƏLL
  },
});

export const { setFilter, resetFilter,setActiveTab  } = filterSlice.actions;
export default filterSlice.reducer;
