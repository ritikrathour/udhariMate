import { createSlice } from "@reduxjs/toolkit";
const StopScrollingSlice = createSlice({
    name: "StopScrollBar",
    initialState: {
        isOpen: false
    },
    reducers: {
        stopScrolling: (state, action) => {
            state.isOpen = action.payload
            document.body.style.overflow = "hidden"
        },
        autoScrolling: (state, action) => {
            state.isOpen = action.payload
            document.body.style.overflow = "auto"
        }
    }
});
export default StopScrollingSlice.reducer;
export const { stopScrolling, autoScrolling } = StopScrollingSlice.actions
