import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import canvas from '../reducers/canvas';
import image from '../reducers/image';
import root from '../sagas/root';
import auth from '../reducers/auth';

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
