import { edited } from '../actions';

const updateTodoText = (todoId,todoText) => {
   return async(dispatch)=>{
    const response =await fetch(`https://lwsserverwithmamun.herokuapp.com/todos/${todoId}`,{
        method:"PATCH",
        body: JSON.stringify({
            text:todoText
        }),
        headers:{
            "content-type":"application/json; charset =UTF-8",
        },
    })
    const todo = await response.json();
    dispatch(edited(todo.id,todo.text));
   }
}

export default updateTodoText