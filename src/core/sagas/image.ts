import { takeEvery, put } from '@redux-saga/core/effects';
import {
  save,
  getRecentImgs,
  getImages,
  getUserImgs,
  getProfileImgs,
} from '../service/image';
import {
  getDBImages,
  getProfileImages,
  getRecentImages,
  getUserImages,
} from '../actions/images';
import { getImage } from '../actions/canvas';
import { AnyAction } from 'redux';
import { toast } from 'react-hot-toast';

export function* imgWorker(payload: AnyAction): Generator {
  try {
    yield save(payload.payload.canvas);
    yield put(getImage.success(payload.payload.canvas, null));
  } catch (error) {
    yield toast.error('Something is went wrong. Please, try again');
    yield put(getImage.failure(null, null));
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
    yield put(getDBImages.success(Images.images, null));
  } catch (error) {
    yield toast.error('Something is went wrong. Please, try again');
    yield put(getDBImages.failure(null, null));
  }
}

export function* getRecentImgsWorker(): Generator {
  const Images = {
    images: [] as Array<object>,
  };
  try {
    yield getRecentImgs().then((res) => (Images.images = res));
    yield put(getRecentImages.success(Images.images, null));
  } catch (error) {
    yield toast.error('Something is went wrong. Please, try again');
    yield put(getRecentImages.failure(null, null));
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
    yield put(getUserImages.success(Images.images, null));
  } catch (error) {
    yield toast.error('Something is went wrong. Please, try again');
    yield put(getUserImages.failure(null, null));
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
    yield put(getProfileImages.success(Images.images, null));
  } catch (error) {
    console.log(error);
    yield toast.error('Something is went wrong. Please, try again');
    yield put(getProfileImages.failure(null, null));
  }
}

export default function* image(): Generator {
  yield takeEvery(getRecentImages.request, getRecentImgsWorker);
  yield takeEvery(getImage.request, imgWorker);
  yield takeEvery(getDBImages.request, getAllImgWorker);
  yield takeEvery(getUserImages.request, getUserImgsWorker);
  yield takeEvery(getProfileImages.request, getProfileImgsWorker);
}
