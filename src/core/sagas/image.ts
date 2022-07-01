import { takeEvery, put } from '@redux-saga/core/effects';
import { AnyAction } from 'redux';
import { toast } from 'react-hot-toast';
import {
  save,
  getRecentImgs,
  getImages,
  getUserImgs,
  getProfileImgs,
} from '../service/image';
import {
  getDBImagesAction,
  getProfileImagesAction,
  getRecentImagesAction,
  getUserImagesAction,
} from '../actions/images';
import { getImageAction } from '../actions/canvas';

export function* imgWorker(payload: AnyAction): Generator {
  try {
    yield save(payload.payload.canvas);
    yield put(getImageAction.success(payload.payload.canvas, null));
  } catch (error) {
    yield toast.error('Something is went wrong. Please, try again');
    yield put(getImageAction.failure(null, null));
  }
}

export function* getAllImgWorker(payload: AnyAction): Generator {
  const Images = {
    images: [] as Array<object>,
  };
  try {
    yield getImages(payload.payload.start).then((images) => {
      images.forEach((image) => {
        Images.images.push(image);
      });
    });
    yield put(getDBImagesAction.success(Images.images, null));
  } catch (error) {
    console.log(error);
    yield toast.error('Something is went wrong. Please, try again');
    yield put(getDBImagesAction.failure(null, null));
  }
}

export function* getRecentImgsWorker(): Generator {
  const Images = {
    images: [] as Array<object>,
  };
  try {
    yield getRecentImgs().then((res) => (Images.images = res));
    yield put(getRecentImagesAction.success(Images.images, null));
  } catch (error) {
    yield toast.error('Something is went wrong. Please, try again');
    yield put(getRecentImagesAction.failure(null, null));
  }
}

export function* getUserImgsWorker(payload: AnyAction): Generator {
  const Images = {
    images: [] as Array<object>,
  };
  try {
    yield getUserImgs(payload.payload.user).then(
      (res) => (Images.images = res)
    );
    yield put(getUserImagesAction.success(Images.images, null));
  } catch (error) {
    yield toast.error('Something is went wrong. Please, try again');
    yield put(getUserImagesAction.failure(null, null));
  }
}

export function* getProfileImgsWorker(payload: AnyAction): Generator {
  const Images = {
    images: [] as Array<object>,
  };
  try {
    yield getProfileImgs(payload.payload.user, payload.payload.start).then(
      (res) => (Images.images = res)
    );
    yield put(getProfileImagesAction.success(Images.images, null));
  } catch (error) {
    yield toast.error('Something is went wrong. Please, try again');
    yield put(getProfileImagesAction.failure(null, null));
  }
}

export default function* image(): Generator {
  yield takeEvery(getRecentImagesAction.request, getRecentImgsWorker);
  yield takeEvery(getImageAction.request, imgWorker);
  yield takeEvery(getDBImagesAction.request, getAllImgWorker);
  yield takeEvery(getUserImagesAction.request, getUserImgsWorker);
  yield takeEvery(getProfileImagesAction.request, getProfileImgsWorker);
}
