import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVideo } from "./videoAPI";

const initialState ={
    video:{},
    isLoading:false,
    isError:false,
    error:''
}

//async thunk
export const fetchVideo = createAsyncThunk('video/fetchVideo',async(id)=>{
     const vedio = await getVideo(id);
     return vedio;
})

const videoSlice = createSlice({
    name:"video",
    initialState,
    extraReducers:(binder)=>{
              binder
                 .addCase(fetchVideo.pending,(state)=>{
                    state.isLoading= true;
                    state.isError = false;
                 })
                 .addCase(fetchVideo.fulfilled,(state,action)=>{
                    state.isLoading = false;
                    state.video =action.payload;
                 })
                 .addCase(fetchVideo.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isError = true;
                    state.error = action.error.message;
                 })
    }
});

export default videoSlice.reducer; 