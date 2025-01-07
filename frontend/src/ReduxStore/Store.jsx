import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice"; 
import StopScrollingReducer from "./StopScrollingSlice";
import BorrowerSlice from "./BorrowerSlice";
export const Store = configureStore({
    reducer: { 
        user : UserReducer, 
        StopScrollBar : StopScrollingReducer,
        borrower:BorrowerSlice
    }
})  