import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import { IS_PRODUCTION } from "~/src/constant";

import RootReducer from "../reducers";

const composeWithDevTools =
  !IS_PRODUCTION && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(RootReducer, composedEnhancer);

export default store;
