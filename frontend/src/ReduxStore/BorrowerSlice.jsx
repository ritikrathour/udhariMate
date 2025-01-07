import { createSlice } from "@reduxjs/toolkit";
const BorrwerSlice = createSlice({
    name : "Borrower",
    initialState:{
        borrower:null
    },
    reducers:{
        GetBorrower:(state,action)=>{ 
            state.borrower = action.payload
        }
    }
    
}); 
export default BorrwerSlice.reducer;
export const {GetBorrower} = BorrwerSlice.actions;