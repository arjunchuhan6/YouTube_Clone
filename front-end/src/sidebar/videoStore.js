import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./videoSlice.js";

const videoStore = configureStore({
    reducer: {
        video: videoReducer
    }
});

export default videoStore;
