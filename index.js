const {createStore, applyMiddleware} = require('redux');
const {applysomeDelays , fetchDataFromAPI} = require('./middleware.js')

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

const store = createStore(reducer,applyMiddleware(applysomeDelays, fetchDataFromAPI));

//subscribing
store.subscribe(()=>{
    console.log(store.getState());
});

//dispatching the actions;
store.dispatch({
    type:"todo/fetchTodo",
});