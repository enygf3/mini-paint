import { takeEvery, put } from '@redux-saga/core/effects';
import { save, getRecentImgs, getImages, getUserImgs } from '../service/image';
import { getDBImages, getRecentImages, getUserImages } from '../actions/images';
import { getImage } from '../actions/canvas';
import { AnyAction } from 'redux';

export function* imgWorker(payload: AnyAction): Generator {
  try {
    yield save(payload.payload.canvas);
    yield put(getImage.success(payload.payload.canvas, null));
  } catch (error) {
    console.log('image', error);
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
    console.log(error);
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
    console.log(error);
    yield put(getUserImages.failure(null, null));
  }
}

export default function* image(): Generator {
  yield takeEvery(getRecentImages.request, getRecentImgsWorker);
  yield takeEvery(getImage.request, imgWorker);
  yield takeEvery(getDBImages.request, getAllImgWorker);
  yield takeEvery(getUserImages.request, getUserImgsWorker);
}
