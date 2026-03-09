import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterTheCardsAPI } from "../../../api/allApi";

// --- 1️⃣ Filter tipləri ---
type WorkerFilters = typeof initialState.workerFilters;
type IncomeFilters = typeof initialState.incomeFilters;
type ExpenseFilters = typeof initialState.expenseFilters;
type BriqadaFilters = typeof initialState.briqadaFilters;

type TabName = "İş kartı" | "Gəlir" | "Xərc" | "Briqada";

interface FilterState {
  activeTab: string | null;
  workerFilters: {
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
  };
  incomeFilters: {
    code: string;
    invoice: string;
    market: string;
    orderNumber: string;
    brand: string;
    paymentType: string;
    supplier: string;
    warehouse: boolean;
  };
  expenseFilters: {
    code: string;
    brand: string;
    client: string;
    paymentType: string;
    cardNumber: string;
    cardStatus: string;
    orderNumber: string;
    supplier: string;
    market: string;
    invoice: string;
    project: string;
  };
  briqadaFilters: { team: string };
}

// --- 2️⃣ Initial state ---
const initialState: FilterState = {
  activeTab: "İş kartı",
  workerFilters: {
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
  },
  incomeFilters: {
    code: "",
    invoice: "",
    market: "",
    orderNumber: "",
    brand: "",
    paymentType: "",
    supplier: "",
    warehouse: false,
  },
  expenseFilters: {
    code: "",
    brand: "",
    client: "",
    paymentType: "",
    cardNumber: "",
    cardStatus: "",
    orderNumber: "",
    supplier: "",
    market: "",
    invoice: "",
    project: "",
  },
  briqadaFilters: {
    team: "",
  },
};

// --- 3️⃣ Async thunk ---
export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (filters: any) => {
    const response = await filterTheCardsAPI(filters);
    return response;
  },
);

// --- 4️⃣ Payload tipi tab-specific filter üçün ---
interface SetFilterPayload {
  tab: TabName;
  filter:
    | Partial<WorkerFilters>
    | Partial<IncomeFilters>
    | Partial<ExpenseFilters>
    | Partial<BriqadaFilters>;
}

// --- 5️⃣ Slice ---
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // Tab-specific filter update
    setFilter: (state, action: PayloadAction<SetFilterPayload>) => {
      const { tab, filter } = action.payload;
      switch (tab) {
        case "İş kartı":
          state.workerFilters = {
            ...state.workerFilters,
            ...(filter as Partial<WorkerFilters>),
          };
          break;
        case "Gəlir":
          state.incomeFilters = {
            ...state.incomeFilters,
            ...(filter as Partial<IncomeFilters>),
          };
          break;
        case "Xərc":
          state.expenseFilters = {
            ...state.expenseFilters,
            ...(filter as Partial<ExpenseFilters>),
          };
          break;
        case "Briqada":
          state.briqadaFilters = {
            ...state.briqadaFilters,
            ...(filter as Partial<BriqadaFilters>),
          };
          break;
      }
    },

    // Active tab update
    setActiveTab: (state, action: PayloadAction<TabName | null>) => {
      state.activeTab = action.payload;
    },

    // Reset whole slice
    resetFilter: () => ({ ...initialState }),

    // Reset only active tab
    resetActiveTabFilter: (state) => {
      const tab = state.activeTab;
      switch (tab) {
        case "İş kartı":
          state.workerFilters = initialState.workerFilters;
          break;
        case "Gəlir":
          state.incomeFilters = initialState.incomeFilters;
          break;
        case "Xərc":
          state.expenseFilters = initialState.expenseFilters;
          break;
        case "Briqada":
          state.briqadaFilters = initialState.briqadaFilters;
          break;
      }
    },
  },
});

export const { setFilter, resetFilter, setActiveTab, resetActiveTabFilter } =
  filterSlice.actions;

export default filterSlice.reducer;
