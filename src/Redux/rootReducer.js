import { combineReducer } from 'redux';
import filterReducer from "./filters/filterReducer";
import todoReducer from "./todos/todoReducer";

const rootReducer = combineReducer({
    todos:todoReducer,
    filters:filterReducer,
})

export default rootReducer;