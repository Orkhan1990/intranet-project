import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterTheCardsAPI } from "../../../api/allApi";

interface FilterState {
  activeTab: string;
  startDate: string | null;
  endDate: string | null;
  workerCardFilters: any;
  incomingFilters: any;
  expenseFilters: any;
  brigadeFilters: any;
  loading: boolean;
  workerCards: any[];
  incomingCards: any[];
  expenseCards: any[];
  brigadeCards: any[];
}

interface FilterPayload {
  tab: string;
  startDate?: string | null;
  endDate?: string | null;
  [key: string]: any;
}

const initialState: FilterState = {
  activeTab: "İş kartı",
  startDate: null,
  endDate: null,
  loading: false,
  workerCards: [],
  incomingCards: [],
  expenseCards: [],
  brigadeCards: [],
  workerCardFilters: {
    cardStatus: "all",
    cardNumber: "",
    sassiNumber: "",
    paymentType: "",
    clientId: "",
    manufactured: "",
    workerId: "",
    receptionId: "",
    minAmount: "",
    maxAmount: "",
    carNumber: "",
    customerType: "",
    legalOrPhysical: "",
    partNumber: "",
  },

  incomingFilters: {
    code: "",
    orderNumber: "",
    market: "",
    brandId: "",
    supplierId: "",
    paymentType: "",
    invoice: "",
    project: "",
  },

  expenseFilters: {
    code: "",
    clientId: "",
    cardStatus: "all",
    orderNumber: "",
    market: "",
    manufactured: "",
    paymentType: "",
    cardNumber: "",
    supplier: "",
    invoice: "",
    project: "",
  },
  brigadeFilters: {
    team: "",
  },
};

export const fetchCards = createAsyncThunk(
  "filter/fetchCards",
  async (payload: FilterPayload) => {
    const response = await filterTheCardsAPI(payload);
    return response; // cards array qaytarır
  },
);

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload;
      // Tab dəyişəndə filterləri reset et
      state.workerCardFilters = initialState.workerCardFilters;
      state.incomingFilters = initialState.incomingFilters;
      state.expenseFilters = initialState.expenseFilters;
      state.brigadeFilters = initialState.brigadeFilters;
      // state.cards = [];
    },
    setStartEndDate(
      state,
      action: PayloadAction<{ startDate?: Date | null; endDate?: Date | null }>,
    ) {
      if (action.payload.startDate !== undefined) {
        state.startDate = action.payload.startDate
          ? action.payload.startDate.toISOString().split("T")[0]
          : null; // YYYY-MM-DD
      }
      if (action.payload.endDate !== undefined) {
        state.endDate = action.payload.endDate
          ? action.payload.endDate.toISOString().split("T")[0]
          : null; // YYYY-MM-DD
      }
    },

    setWorkerCardFilter(state, action: PayloadAction<any>) {
      state.workerCardFilters = {
        ...state.workerCardFilters,
        ...action.payload,
      };
    },

    setIncomingFilter(state, action: PayloadAction<any>) {
      state.incomingFilters = {
        ...state.incomingFilters,
        ...action.payload,
      };
    },

    setExpensesFilter(state, action: PayloadAction<any>) {
      state.expenseFilters = {
        ...state.expenseFilters,
        ...action.payload,
      };
    },
    setBrigadeFilter(state, action: PayloadAction<any>) {
      state.brigadeFilters = {
        ...state.brigadeFilters,
        ...action.payload,
      };
    },

    // bütün tab-ları reset edir
    resetFilters(state) {
      state.startDate = null;
      state.endDate = null;
      state.workerCardFilters = initialState.workerCardFilters;
      state.incomingFilters = initialState.incomingFilters;
      state.expenseFilters = initialState.expenseFilters;
      state.brigadeFilters = initialState.brigadeFilters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;

        const { tab, cards } = action.payload;

        if (tab === "İş kartı") {
          state.workerCards = cards;
        }

        if (tab === "Gəlir") {
          state.incomingCards = cards;
        }

        if (tab === "Xərc") {
          state.expenseCards = cards;
        }
      })

      .addCase(fetchCards.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setActiveTab,
  setStartEndDate,
  resetFilters,
  setWorkerCardFilter,
  setIncomingFilter,
  setExpensesFilter,
  setBrigadeFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
export type { FilterState, FilterPayload };
