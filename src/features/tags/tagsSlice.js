import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTags } from "./tagsAPI";

const initialState ={
    tags:[],
    isLoading:false,
    isError:false,
    error:''
}

//async thunk
export const fetchTags = createAsyncThunk('tags/fetchTags',async()=>{
     const tags = await getTags();
     return tags;
})

const tagslice = createSlice({
    name:"tags",
    initialState,
    extraReducers:(binder)=>{
              binder
                 .addCase(fetchTags.pending,(state)=>{
                    state.isLoading= true;
                    state.isError = false;
                 })
                 .addCase(fetchTags.fulfilled,(state,action)=>{
                    state.isLoading = false;
                    state.tags =action.payload;
                 })
                 .addCase(fetchTags.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isError = true;
                    state.error = action.error?.message;
                 })
    }
});

export default tagslice.reducer; 