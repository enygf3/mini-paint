import { all } from '@redux-saga/core/effects';
import auth from './auth';
import image from './image';

export default function* root() {
  yield all([auth(), image()]);
}
