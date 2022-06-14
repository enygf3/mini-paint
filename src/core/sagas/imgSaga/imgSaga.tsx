import { takeEvery, put, call, all } from "@redux-saga/core/effects";
import {
  GET_DB_IMAGES,
  GET_IMAGE_DATA,
  GET_RECENT_IMAGES,
} from "../../actions/actions";
import {
  save,
  getRecentImgs,
  getImages,
} from "../../service/firebaseImg/firebaseImg";
import {
  saveImgSucceed,
  saveImgFailed,
  getDBImagesFailed,
  getDBImagesSucceed,
  getRecentImgsSucceed,
  getRecentImgsFailed,
} from "../../actions/actionsImg/actionsImg";

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

export function* recentWatcher(): Generator {
  yield takeEvery(GET_RECENT_IMAGES, getRecentImgsWorker);
}

export function* imgWatcher(): Generator {
  yield takeEvery(GET_IMAGE_DATA, imgWorker);
}

export function* DBWatcher(): Generator {
  yield takeEvery(GET_DB_IMAGES, getAllImgWorker);
}

export default function* imgSaga(): Generator {
  yield all([call(imgWatcher), call(DBWatcher), call(recentWatcher)]);
}
