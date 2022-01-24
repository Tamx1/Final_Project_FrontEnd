import { createStore, combineReducers } from "redux";
import userReducer from "../reducers/Users/reducer";


const reducers = combineReducers({ userReducer });
const store = createStore(reducers);

export default store;
