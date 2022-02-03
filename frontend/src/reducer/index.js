//

import { combineReducers, createStore } from "redux";

import loginReducer from "../reducer/login/index";
import casesReducer from "../reducer/cases/index";

const reducers = combineReducers({ loginReducer, casesReducer });

const store = createStore(reducers);

export default store;
