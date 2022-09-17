import { configureStore } from "@reduxjs/toolkit"
import apiSlice from "./slices/apiSlice"
const store = configureStore({
    reducer: {
        apiSlice: apiSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }
    ),

})
export default store