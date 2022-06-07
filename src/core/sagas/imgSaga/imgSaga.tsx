import { takeEvery, put, call, all } from "@redux-saga/core/effects";
import { SAVE_IMG, GET_IMAGE_DATA } from "../../actions/actions";
import { save } from "../../service/firebaseImg/firebaseImg";
import {
  saveImgSucceed,
  saveImgFailed,
} from "../../actions/actionsImg/actionsImg";

export function* imgWorker(payload: any) {
  try {
    yield save(payload.payload.canvas);
    yield put(saveImgSucceed(payload.payload.canvas));
  } catch (error) {
    console.log("imgSaga", error);
    yield put(saveImgFailed());
  }
}

export function* saveImg() {
  yield takeEvery(GET_IMAGE_DATA, imgWorker);
}

export default function* imgSaga(): Generator {
  yield all([call(saveImg)]);
}
