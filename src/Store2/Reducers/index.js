import { combineReducers } from "redux";
import TestReducer from "./TestReducers";

const reducers = combineReducers({
    Test: TestReducer,
    //other reducers come here...   
});

export default reducers;