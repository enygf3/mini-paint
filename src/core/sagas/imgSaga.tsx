import { takeEvery, put, call, all } from "@redux-saga/core/effects";
import {
  GET_DB_IMAGES,
  GET_IMAGE_DATA,
  GET_RECENT_IMAGES,
  GET_USER_IMGS,
} from "../actions/actions";
import {
  save,
  getRecentImgs,
  getImages,
  getUserImgs,
} from "../service/firebaseImg";
import {
  saveImgSucceed,
  saveImgFailed,
  getDBImagesFailed,
  getDBImagesSucceed,
  getRecentImgsSucceed,
  getRecentImgsFailed,
  getUserImgsSucceed,
  getUserImgsFailed,
} from "../actions/actionsImg";

export function* imgWorker(payload: any): Generator {
  try {
    yield save(payload.payload.canvas);
    yield put(saveImgSucceed(payload.payload.canvas));
  } catch (error) {
    console.log("imgSaga", error);
    yield put(saveImgFailed());
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
    yield put(getDBImagesSucceed(Images.images));
  } catch (error) {
    console.log(error);
    yield put(getDBImagesFailed());
  }
}

export function* getRecentImgsWorker(): Generator {
  const Images = {
    images: [] as any[],
  };
  try {
    yield getRecentImgs().then((res) => (Images.images = res));
    yield put(getRecentImgsSucceed(Images.images));
  } catch (error) {
    yield put(getRecentImgsFailed());
  }
}

export function* getUserImgsWorker(payload: any): Generator {
  const Images = {
    images: [] as any[],
  };
  try {
    yield getUserImgs(payload.payload.user).then(
      (res) => (Images.images = res)
    );
    yield put(getUserImgsSucceed(Images.images));
  } catch (error) {
    console.log(error);
    yield put(getUserImgsFailed());
  }
}

export function* recentWatcher(): Generator {
  yield takeEvery(GET_RECENT_IMAGES, getRecentImgsWorker);
}

export function* imgWatcher(): Generator {
  yield takeEvery(GET_IMAGE_DATA, imgWorker);
}

export function* DBWatcher(): Generator {
  yield takeEvery(GET_DB_IMAGES, getAllImgWorker);
}

export function* userImgsWatcher(): Generator {
  yield takeEvery(GET_USER_IMGS, getUserImgsWorker);
}

export default function* imgSaga(): Generator {
  yield all([
    call(imgWatcher),
    call(DBWatcher),
    call(recentWatcher),
    call(userImgsWatcher),
  ]);
}
