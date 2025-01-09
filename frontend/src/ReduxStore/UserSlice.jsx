import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import AxiosInstance from "../utils/AxiosInstance"; 

const initialState = {
    user: null,
    loading: false,
    error: null,
}
const reFreshAccessToken = async () => {
    try {
        await AxiosInstance.post("/user/refresh-access-token", {});
    } catch (error) {
        console.log(error);
    }
}
export const GetUser = createAsyncThunk("auth/getUser", async (_, { rejectWithValue }) => {
    try {
        const response = await AxiosInstance.get("/user");
        return response?.data?.data;
    } catch (error) {
        console.log(error?.response?.data?.message);
        console.log(error);
        
        if (error.response.status === 401) {
            reFreshAccessToken();
        }
        return rejectWithValue(error?.response?.data?.message)
    }
});
const UserSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(GetUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(GetUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.error = null;
            state.loading = false
        }).addCase(GetUser.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false;
            state.user = null;
        })
    }
})
export default UserSlice.reducer;
