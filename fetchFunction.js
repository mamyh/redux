const fetch = require('node-fetch');

const fetchFunction= async(dispatch,getState)=>{
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
         const todos = await response.json();
         dispatch({
            type:"todo/todoLoaded",
            payload:todos
         });
         console.log('todos',getState().todos.length)
}

module.exports ={
    fetchFunction
}