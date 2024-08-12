import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './Slices/authSlice'

const rootReducer = combineReducers({
    auth: authSlice
})
export default rootReducer;