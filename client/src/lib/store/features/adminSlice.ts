import { AdminAuthData } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AdminAuthData = {
  admin: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = {
        _id: action.payload._id,
        email: action.payload.email,
        name: action.payload.name,
        phone: action.payload.phone,
        profilePicture: action.payload.profilePicture,
        role: action.payload.role,
        token: action.payload.token,
      };
    },
    adminLogout: (state) => {
      state.admin = null;
    },
  },
});

export const { setAdmin, adminLogout } = adminSlice.actions;

export default adminSlice.reducer;
