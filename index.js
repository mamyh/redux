const {createStore, applyMiddleware} = require('redux');
// const {applysomeDelays , fetchAsyncMiddleware} = require('./middleware.js');
const thunk = require('redux-thunk');
const {fetchFunction} = require('./fetchFunction')

//initializing the state ;
const initialState={
    todos:[]
}

//make reducer logic 
const  reducer =(state=initialState,action)=>{
    switch(action.type){
        case "todo/todoAdded":{
            return {
                ...state,
                todos:[
                    ...state.todos,
                    {
                        todo:'Learn some interesting things'
                    }
                ]
            }
        }
        case "todo/todoLoaded":{
            return{
                ...state,
                todos:[...state.todos,...action.payload]
            }
        }
        default: return state;
    }
}

//creating store
console.log(thunk);
const store = createStore(reducer,applyMiddleware(thunk.default));

//subscribing
store.subscribe(()=>{
    console.log(store.getState());
});

//dispatching the actions;
store.dispatch(fetchFunction); 
console.log('this is sync');