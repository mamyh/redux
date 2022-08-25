import { ADDED, ALLCOMPLETED, CLEARCOMPLETED, COLORSELECTED, DELETED, TOGGLED } from './actiontypes';

export const added =(todoText)=>{
    return {
        type:ADDED,
        payload:todoText,
    }
}
export const toggled =(todoId,completed)=>{
    return {
        type:TOGGLED,
        payload:{
            todoId,completed
        }
    }
}
export const  deleted=(todoId)=>{
    return {
        type:DELETED,
        payload: todoId
    }
}
export const  colorSelected=(todoId,color)=>{
    return {
        type:COLORSELECTED,
        payload: {todoId,color}
    }
}
export const  clearCompleted=()=>{
    return {
        type:CLEARCOMPLETED
    }
}
export const  allCompleted=()=>{
    return {
        type:ALLCOMPLETED
    }
}