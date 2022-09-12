import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:'All',
    colors:[],
}

const filtersSlice = createSlice({
    name:"filters",
    initialState,
    reducers:{
       changeStatus:(state,action)=>{
         state.status = action.payload;
       },
       newColor:(state,action)=>{
         state.colors.push(action.payload)
       },
       removeColor:(state,action)=>{
        state.colors =state.colors.filter(color=>color !==action.payload);
       }
    }
});

export default filtersSlice.reducer;
export const {changeStatus,newColor,removeColor} = filtersSlice.actions