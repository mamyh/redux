import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVideos } from "./videosAPI";

const initialState ={
    videos:[],
    isLoading:false,
    isError:false,
    error:''
}

//async thunk
export const fetchVideos = createAsyncThunk('videos/fetchVideos',async({tags,search})=>{
     const vedios = await getVideos(tags,search);
     return vedios;
})

const videoSlice = createSlice({
    name:"videos",
    initialState,
    extraReducers:(binder)=>{
              binder
                 .addCase(fetchVideos.pending,(state)=>{
                    state.isLoading= true;
                    state.isError = false;
                 })
                 .addCase(fetchVideos.fulfilled,(state,action)=>{
                    state.isLoading = false;
                    state.videos =action.payload;
                 })
                 .addCase(fetchVideos.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isError = true;
                    state.error = action.error.message;
                 })
    }
});

export default videoSlice.reducer; 