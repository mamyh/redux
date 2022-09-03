import { createSlice } from "@reduxjs/toolkit";

const initialState ={
     tags:[],
     search:'',
     author:'',
}


const filtersSlice = createSlice({
    name:"filters",
    initialState,
    reducers:{
       tagAdded:(state,action)=>{
          state.tags.push(action.payload)
       },
       tagRemoved:(state,action)=>{
         const indexToRemove = state.tags.indexOf(action.payload);
         if(indexToRemove !==-1){
            state.tags.splice(indexToRemove,1);
         }
       },
       searched:(state,action)=>{
          state.search = action.payload;
       },
       authorSet:(state,action)=>{
           state.author =action.payload;
       },
       reset:(state,action) =>{
         state.tags.length =0;
         state.search ='';
         state.author="";
       }
    }
});

export default filtersSlice.reducer; 
export const {tagAdded,tagRemoved,searched ,authorSet, reset} = filtersSlice.actions;