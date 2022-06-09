import { takeEvery, put, call, all } from "@redux-saga/core/effects";
import { GET_DB_IMAGES, GET_IMAGE_DATA } from "../../actions/actions";
import { save, getDB } from "../../service/firebaseImg/firebaseImg";
import {
  saveImgSucceed,
  saveImgFailed,
  getDBImagesFailed,
  getDBImagesSucceed,
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
    images: getDB(payload.payload.images),
  };
  try {
    yield put(getDBImagesSucceed(Images.images));
  } catch (error) {
    yield put(getDBImagesFailed());
  }
}

export function* imgWatcher(): Generator {
  yield takeEvery(GET_IMAGE_DATA, imgWorker);
}

export function* DBWatcher(): Generator {
  yield takeEvery(GET_DB_IMAGES, getAllImgWorker);
}

export default function* imgSaga(): Generator {
  yield all([call(imgWatcher), call(DBWatcher)]);
}
