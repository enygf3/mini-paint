import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from '../reducers/authReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import canvasReducer from '../reducers/canvasReducer';
import imgReducer from '../reducers/imgReducer';
import rootSaga from '../sagas/rootSaga';

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
