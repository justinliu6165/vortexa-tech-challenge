import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGeoData } from "./geoDataAPI.js";

const initialState = {
    geoData: [],
    status: null
};

export const fetchDataAsync = createAsyncThunk(
    'api/fetchDataAsync',
    async (obj, { rejectWithValue }) => {
        try {
            const response = await fetchGeoData();
            return response;
        } catch(error) {
            rejectWithValue({ error: error.message })
        }
    }
)

export const fetchGeoDataSlice = createSlice({
    name: "api",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDataAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.geoData = action.payload;
            })
            .addCase(fetchDataAsync.rejected, (state, action) => {
                state.status = 'failed';
                // action.error
            });
    }
})

export default fetchGeoDataSlice.reducer;
