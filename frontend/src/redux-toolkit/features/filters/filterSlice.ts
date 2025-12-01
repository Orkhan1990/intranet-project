import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  cardStatus: "all" | "open" | "closed";
  cardNumber: string;
  banNumber: string;
  paymentType: string;
  clientId: string;
  brandId: string;
  workerId: string;
  receptionId: string;
  minAmount: number | "";
  maxAmount: number | "";
  customerType: string;
  legalOrPhysical: string;
  carNumber: string;
}

const initialState: FilterState = {
  cardStatus: "all",
  cardNumber: "",
  banNumber: "",
  paymentType: "",
  clientId: "",
  brandId: "",
  workerId: "",
  receptionId: "",
  minAmount: "",
  maxAmount: "",
  customerType: "",
  legalOrPhysical: "",
    carNumber: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<FilterState>>) => {
      Object.assign(state, action.payload);
    },
    resetFilter: () => initialState,
  },
});

export const { setFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
