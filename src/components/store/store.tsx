import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import authReducer from "../reducers/authReducer";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(authReducer as any, applyMiddleware(sagaMiddleware));

export default store