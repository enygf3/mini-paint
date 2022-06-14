import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import authReducer from "../reducers/authReducer/authReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import canvasReducer from "../reducers/canvasReducer/canvasReducer";
import imgReducer from "../reducers/imgReducer/imgReducer";
import rootSaga from "../sagas/rootSaga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  canvas: canvasReducer,
  images: imgReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
