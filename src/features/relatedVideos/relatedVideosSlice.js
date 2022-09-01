import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRelatedVideos } from "./relatedVideosAPI";

const initialState ={
    relatedVideos:[],
    isLoading:false,
    isError:false,
    error:''
}

//async thunk
export const fetchRelatedVideos = createAsyncThunk('relatedVideos/fetchRelatedVideos',async({tags,id})=>{
     
     const vedios = await getRelatedVideos({tags,id});
     return vedios;
})

const relatedVideoSlice = createSlice({
    name:"relatedVideos",
    initialState,
    extraReducers:(binder)=>{
              binder
                 .addCase(fetchRelatedVideos.pending,(state)=>{
                    state.isLoading= true;
                    state.isError = false;
                 })
                 .addCase(fetchRelatedVideos.fulfilled,(state,action)=>{
                    state.isLoading = false;
                    state.relatedVideos =action.payload;
                 })
                 .addCase(fetchRelatedVideos.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isError = true;
                    state.error = action.error.message;
                 })
    }
});

export default relatedVideoSlice.reducer; 