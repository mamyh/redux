import { ADDED, ALLCOMPLETED, CLEARCOMPLETED, COLORSELECTED, DELETED, TOGGLED } from './actiontypes';
import { initialState } from './initialState';

const nextTodoId =(todos)=>{
    const maxId = todos.reduce((maxId,todo)=>Math.max(maxId,todo.id),-1);
    return maxId + 1;
}

const todoReducer=(state = initialState,action)=>{
    switch(action.type){
        case ADDED:{
            return [
                ...state,
                {
                    id: nextTodoId(state),
                    todoText:action.payload,
                    completed:false,
                }
            ]
        }

        case TOGGLED :{
            return state.map(todo=>{
                if(todo.id !== action.payload.todoId){
                    return todo;
                }
                return {
                    ...todo,
                    completed:!action.payload.completed,
                }
            })
        }

        case COLORSELECTED :{
            const {color,todoId} = action.payload;
            return state.map(todo=>{
                if(todo.id!==todoId){
                    return todo;
                }
                return {
                    ...todo,
                    color:color,
                }
            })
        }

        case DELETED: {
            return state.filter(todo=> todo.id !== action.payload)
        }


        case ALLCOMPLETED:{
            return state.map(todo=> ({...todo,completed:true}))
        }

        case CLEARCOMPLETED: {
            return state.filter(todo=>!todo.completed)
        }

        default: return state;
    }
}

export default todoReducer;