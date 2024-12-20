import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = 'http://localhost:5000/video';
export const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  });


const videoSlice = createSlice({
    name: "video",
    initialState: {
        videos: [],
        loading: false,
        error: null,// Initialize error as null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder 
        // Handle pending state
        .addCase(fetchVideos.pending, (state) => {
            state.loading = true;
            state.error = null; // Reset error on new fetch
        })
        // Handle fulfilled state
        .addCase(fetchVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videos = action.payload;
        })
        // Handle rejected state
        .addCase(fetchVideos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; // Capture error message
        })
    },
}) ;

export default videoSlice.reducer;
