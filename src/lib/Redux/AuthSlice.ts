import { createSlice } from "@reduxjs/toolkit";
type initialState = {
    token : null | string
}
const initialState : initialState = { token : null  }
const authSlice = createSlice({
    name: 'Auth',
    initialState, 
    reducers: {
        clearToken(pervesState) {
            pervesState.token = ''
        },
        setToken(pervesState, action) {
            pervesState.token = action.payload
        }
    }
})

export const {clearToken,setToken} = authSlice.actions
export default authSlice.reducer