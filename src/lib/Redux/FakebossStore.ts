import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../Redux/AuthSlice'


export const ourStore = configureStore({
    reducer: {
        authSlice
    }
})

export type ourStoreType = ReturnType<typeof ourStore.getState>