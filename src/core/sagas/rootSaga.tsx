import authSaga from "./authSaga";
import imgSaga from "./imgSaga";
import { all } from "@redux-saga/core/effects";

export default function* rootSaga() {
  yield all([authSaga(), imgSaga()]);
}
