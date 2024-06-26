import { createSlice } from '@reduxjs/toolkit'
import { ModalState } from './loginModal'

const initialState: ModalState = {
  value: false,
}

export const OtpModalSlice = createSlice({
  name: 'OtpModal',
  initialState,
  reducers: {
    openOtpModal: (state) => {
      state.value = true
    },
    closeOtpModal: (state) => {
      state.value = false
    },
  
  },
})

export const { openOtpModal, closeOtpModal } = OtpModalSlice.actions

export default OtpModalSlice.reducer