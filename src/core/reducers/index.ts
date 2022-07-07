import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import canvas from './canvas';
import image from './image';
import root from '../sagas/root';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: auth,
  canvas: canvas,
  images: image,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(root);

export default store;
