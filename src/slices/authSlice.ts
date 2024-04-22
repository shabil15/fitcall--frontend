import { createSlice } from "@reduxjs/toolkit";

export interface UserInfo{
  _id?: string;
  email: string;
  name: string;
  mobile?: number;
  password?: string;
}


interface InitialState {
  // userInfo: UserInfo | null;
  // registerInfo: UserInfo | null;
  // workerInfo: UserInfo | null;
  adminInfo: UserInfo | null;
  // forgotEmailInfo: string | null;
}



// const userInfoFromLocalStorage = localStorage.getItem("userInfo");
// const registerInfoFromLocalStorage = localStorage.getItem("registerInfo");
// const workerInfoFromLocalStorage = localStorage.getItem("workerInfo");
const adminInfoFromLocalStorage = localStorage.getItem("adminInfo");
// const forgotEmailInfoFromLocalStorage = localStorage.getItem("forgotEmailInfo");



const initialState: InitialState = {
  adminInfo: adminInfoFromLocalStorage
    ? JSON.parse(adminInfoFromLocalStorage)
    : null,
};


const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers: {
    setAdminCredentials: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
  }
})

export const {
  setAdminCredentials
}= authSlice.actions;

export default authSlice.reducer;