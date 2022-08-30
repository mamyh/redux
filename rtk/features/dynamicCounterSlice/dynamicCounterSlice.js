const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
    counter:0,
}
const dynamicCounterSlice = createSlice({
    name:"dynamicCounterSlice",
    initialState,
    reducers:{
        increment:(state, action)=>{
           state.counter += action.payload;
        },
        decrement:(state,action)=>{
            state.counter -=action.payload;
        }
    }
});

module.exports = dynamicCounterSlice.reducer;
module.exports.dynamicCounterActions = dynamicCounterSlice.actions;