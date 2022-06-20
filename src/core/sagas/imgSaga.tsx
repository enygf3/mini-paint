import { takeEvery, put, call, all } from '@redux-saga/core/effects';
import {
  save,
  getRecentImgs,
  getImages,
  getUserImgs,
} from '../service/firebaseImg';
import {
  getDBImages,
  getImage,
  getRecentImages,
  getUserImages,
} from '../actions/actionCreators';

export function* imgWorker(payload: any): Generator {
  try {
    yield save(payload.payload.canvas);
    yield put(getImage.success(payload.payload.canvas, null));
  } catch (error) {
    console.log('imgSaga', error);
    yield put(getImage.failure(null, null));
  }
}

export function* getAllImgWorker(payload: any): Generator {
  const Images = {
    images: [] as Array<any>,
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
    images: [] as Array<any>,
  };
  try {
    yield getRecentImgs().then((res) => (Images.images = res));
    yield put(getRecentImages.success(Images.images, null));
  } catch (error) {
    yield put(getRecentImages.failure(null, null));
  }
}

export function* getUserImgsWorker(payload: any): Generator {
  const Images = {
    images: [] as Array<any>,
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

export function* recentWatcher(): Generator {
  yield takeEvery(getRecentImages.request, getRecentImgsWorker);
}

export function* imgWatcher(): Generator {
  yield takeEvery(getImage.request, imgWorker);
}

export function* DBWatcher(): Generator {
  yield takeEvery(getDBImages.request, getAllImgWorker);
}

export function* userImgsWatcher(): Generator {
  yield takeEvery(getUserImages.request, getUserImgsWorker);
}

export default function* imgSaga(): Generator {
  yield all([
    call(imgWatcher),
    call(DBWatcher),
    call(recentWatcher),
    call(userImgsWatcher),
  ]);
}
