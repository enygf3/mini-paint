import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import auth from './auth';
import canvas from './canvas';
import image from './image';
import { composeWithDevTools } from 'redux-devtools-extension';
import root from '../sagas/root';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: auth,
  canvas: canvas,
  images: image,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(root);

export default store;
