//

import { combineReducers, createStore } from "redux";

import loginReducer from "./login";
import casesReducer from "./cases";
const reducers = combineReducers({ loginReducer, casesReducer});

const store = createStore(reducers);

export default store;
