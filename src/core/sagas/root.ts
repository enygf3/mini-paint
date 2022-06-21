import auth from './auth';
import image from './image';
import { all } from '@redux-saga/core/effects';

export default function* root() {
  yield all([auth(), image()]);
}
