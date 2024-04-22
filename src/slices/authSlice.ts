import { createSlice } from "@reduxjs/toolkit";

export interface UserInfo {
  _id?: string;
  email: string;
  name: string;
  mobile?: number;
  password?: string;
}

interface InitialState {
  userInfo: UserInfo | null;
  registerInfo: UserInfo | null;
  adminInfo: UserInfo | null;
  forgotEmailInfo: string | null;
}

const userInfoFromLocalStorage = localStorage.getItem("userInfo");
const registerInfoFromLocalStorage = localStorage.getItem("registerInfo");
const adminInfoFromLocalStorage = localStorage.getItem("adminInfo");
const forgotEmailInfoFromLocalStorage = localStorage.getItem("forgotEmailInfo");

const initialState: InitialState = {
  userInfo: userInfoFromLocalStorage
    ? JSON.parse(userInfoFromLocalStorage)
    : null,

  registerInfo: registerInfoFromLocalStorage
    ? JSON.parse(registerInfoFromLocalStorage)
    : null,

  adminInfo: adminInfoFromLocalStorage
    ? JSON.parse(adminInfoFromLocalStorage)
    : null,

  forgotEmailInfo: forgotEmailInfoFromLocalStorage
    ? JSON.parse(forgotEmailInfoFromLocalStorage)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },

    setRegister: (state, action) => {
      state.registerInfo = action.payload;
      localStorage.setItem("registerInfo", JSON.stringify(action.payload));
    },

    clearRegister: (state) => {
      state.registerInfo = null;
      localStorage.removeItem("registerInfo");
    },

    setAdminCredentials: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },

    setForgotEmail: (state, action) => {
      state.forgotEmailInfo = action.payload;
      localStorage.setItem("forgotEmailInfo", JSON.stringify(action.payload));
    },

    clearForgotEmail: (state) => {
      state.forgotEmailInfo = null;
      localStorage.removeItem("forgotEmailInfo");
    },
  },
});

export const {
  setCredential,
  setRegister,
  clearRegister,
  setForgotEmail,
  clearForgotEmail,
  setAdminCredentials,
} = authSlice.actions;

export default authSlice.reducer;
