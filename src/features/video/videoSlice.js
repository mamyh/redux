import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addingLikes, addingUnlikes, getVideo } from "./videoAPI";

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
export const updateLike= createAsyncThunk('video/updateLike',async({videoId,dataLike})=>{
   const likes = await addingLikes(videoId,dataLike);
   return likes
});
export const updateUnlike= createAsyncThunk('video/updateUnlike',async({videoId,dataUnlike})=>{
   const unlikes = await addingUnlikes(videoId,dataUnlike);
   return unlikes
});

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
                 .addCase(updateLike.pending, (state,action)=>{
                  state.isLoading = true;
                  state.isError = false;
                 })
                 .addCase(updateLike.fulfilled, (state,action)=>{
                  state.isLoading=false;
                  state.video = action.payload;
                 })
                 .addCase(updateLike.rejected, (state,action)=>{
                  state.isLoading=false;
                  state.isError=true;
                  state.error =action.error.message;
                 })
                 .addCase(updateUnlike.pending, (state,action)=>{
                  state.isLoading = true;
                  state.isError = false;
                 })
                 .addCase(updateUnlike.fulfilled, (state,action)=>{
                  state.isLoading=false;
                  state.video = action.payload;
                 })
                 .addCase(updateUnlike.rejected, (state,action)=>{
                  state.isLoading=false;
                  state.isError=true;
                  state.error =action.error.message;
                 })
    }
});

export default videoSlice.reducer; 