import authReducer from "./auth";
import memoryReducer from "./memory"
import {combineReducers} from "redux";


const allReducers = combineReducers({
    auth:authReducer,
    memory:memoryReducer
})

export default allReducers;