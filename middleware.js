const fetch = require('node-fetch');

const applysomeDelays = (store)=>(next)=>(action)=>{
     if(action.type === "todo/todoAdded"){
        setTimeout(()=>{
            return next(action)
        },300)
        return;
     }
     return next(action);
}

const fetchDataFromAPI=(store)=>(next)=>async (action)=>{
    if(action.type === "todo/fetchTodo"){
         const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
         const todos = await response.json();
         store.dispatch({
            type:"todo/todoLoaded",
            payload:todos
         });
         console.log('todos',store.getState().todos.length)
         return;
    }
    return next(action);
}

module.exports ={
    applysomeDelays,
    fetchDataFromAPI
}