import { createSlice } from "@reduxjs/toolkit";

export interface UserInfo {
  _id?: string;
  email: string;
  name: string;
  mobile?: number;
  password?: string;
}

export interface TrainerInfo extends UserInfo{
  img:string,
  joinDate:string
}


interface InitialState {
  userInfo: UserInfo | null;
  registerInfo: UserInfo | null;
  trainerInfo:TrainerInfo |null;
  adminInfo: UserInfo | null;
  forgotEmailInfo: string | null;
}

const userInfoFromLocalStorage = localStorage.getItem("userInfo");
const registerInfoFromLocalStorage = localStorage.getItem("registerInfo");
const adminInfoFromLocalStorage = localStorage.getItem("adminInfo");
const trainerInfoFromLocalStorage = localStorage.getItem("trainerInfo");
const forgotEmailInfoFromLocalStorage = localStorage.getItem("forgotEmailInfo");

const initialState: InitialState = {
  userInfo: userInfoFromLocalStorage
    ? JSON.parse(userInfoFromLocalStorage)
    : null,

  registerInfo: registerInfoFromLocalStorage
    ? JSON.parse(registerInfoFromLocalStorage)
    : null,

    trainerInfo: trainerInfoFromLocalStorage
    ? JSON.parse(trainerInfoFromLocalStorage)
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

    userLogout:(state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo")
    },

    setTrainerCredential: (state, action) => {
      state.trainerInfo = action.payload;
      localStorage.setItem("trainerInfo", JSON.stringify(action.payload));
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
  setTrainerCredential,
  setForgotEmail,
  userLogout,
  clearForgotEmail,
  setAdminCredentials,
} = authSlice.actions;

export default authSlice.reducer;
