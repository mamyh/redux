const createSlice = require('@reduxjs/toolkit').createSlice;

//initial state 
const initialState= {
    counter:0,
}

const counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        increment:(state,action)=>{
            state.counter++;
        },
        decrement:(state,action)=>{
            state.counter--;
        }
    },
});

module.exports=counterSlice.reducer;
module.exports.counterActions = counterSlice.actions;