import { takeEvery, put, call, all } from "@redux-saga/core/effects";
import { SAVE_IMG, GET_IMAGE_DATA } from "../../actions/actions";
import { save } from "../../service/firebaseImg/firebaseImg";
import {
  saveImgSucceed,
  saveImgFailed,
} from "../../actions/actionsImg/actionsImg";

export function* imgWorker() {
  const Image: { img: string } = {
    img: "",
  };

  try {
    yield save().then((img) => {
      Image.img = img;
    });
    yield put(saveImgSucceed(Image.img));
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
