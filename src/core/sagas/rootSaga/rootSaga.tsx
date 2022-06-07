import authSaga from "../authSaga/authSaga";
import imgSaga from "../imgSaga/imgSaga";
import { all } from "@redux-saga/core/effects";

export default function* rootSaga() {
  yield all([authSaga(), imgSaga()]);
}
