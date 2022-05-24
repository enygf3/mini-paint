import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import authReducer from "../reducers/authReducer/authReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import canvasReducer from "../reducers/canvasReducer/canvasReducer";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  canvas: canvasReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

export default store;
