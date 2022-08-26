import { createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import cardsReducer from "./cards/cardsReducer";
const store = createStore(cardsReducer,composeWithDevTools());

export default store;