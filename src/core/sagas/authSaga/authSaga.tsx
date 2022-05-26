import { takeEvery, put, call, all } from "@redux-saga/core/effects";
import { AnyAction } from "redux";
import { SIGN_IN } from "../../actions/actions";
import { signInUser } from "../../service/firebaseAuth/firebaseAuth";
import {
  signInUserSucceed,
  signInUserFailed,
} from "../../actions/actionsAuth/actionsAuth";

export function* signInWorker(data: AnyAction) {
  const User: { user: string } = {
    user: "",
  };

  try {
    yield signInUser();
    yield put(signInUserSucceed(User));
  } catch (error) {
    yield put(signInUserFailed());
  }
}

export function* signIn(): any {
  yield takeEvery(SIGN_IN, signInWorker);
}

export default function* signInSaga(): Generator {
  yield all([call(signIn)]);
}
