import { createSlice } from "@reduxjs/toolkit";

interface CurrentUser {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

type InitialState = {
  currentUser: CurrentUser;
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  currentUser: {} as CurrentUser,
  loading: false,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    successLoading: (state) => {
      state.loading = true;
      state.error = "";
    },
    successStart: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = "";
    },
    successFaliure: (state, action) => {
      state.currentUser = {} as CurrentUser;
      state.error = action.payload;
      state.loading = false;
    },
    signOut: (state) => {
      state.currentUser ={} as CurrentUser;
      state.error = "";
      state.loading = false;
    },
  },
});

export const { successStart, successLoading, successFaliure, signOut } =
  authSlice.actions;
export default authSlice.reducer;
