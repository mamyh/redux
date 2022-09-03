import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVideos } from "./videosAPI";

const initialState ={
    videos:[],
    isLoading:false,
    isError:false,
    error:'',
    currentPage:1,
    currentVideos:[]
}

//async thunk
export const fetchVideos = createAsyncThunk('videos/fetchVideos',async({tags,search,author})=>{
     const vedios = await getVideos(tags,search,author);
     return vedios;
});



const videoSlice = createSlice({
    name:"videos",
    initialState,
    reducers:{
        changedPages:(state,action)=>{
          let start = 4*(action.payload-1);
          let end = 4*action.payload;
          state.currentPage = action.payload;
          state.currentVideos = state.videos.slice(start,end);
        }
    },
    extraReducers:(binder)=>{
              binder
                 .addCase(fetchVideos.pending,(state)=>{
                    state.isLoading= true;
                    state.isError = false;
                 })
                 .addCase(fetchVideos.fulfilled,(state,action)=>{
                    state.isLoading = false;
                    state.videos =action.payload;
                    state.currentVideos = state.videos.slice(0,4);
                 })
                 .addCase(fetchVideos.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isError = true;
                    state.error = action.error.message;
                 })
                 

    }
});

export default videoSlice.reducer; 
export const {changedPages} = videoSlice.actions;