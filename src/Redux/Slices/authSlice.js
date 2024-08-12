import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogin(state, action) {
      state.user = action.payload
    },
    authLogout() {
      return initialState
    }
  },
})
export const { authLogin, authLogout } = authSlice.actions

export default authSlice.reducer