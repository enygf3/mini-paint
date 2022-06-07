import { takeEvery, put, call, all } from "@redux-saga/core/effects";
import { SIGN_IN, SIGN_OUT } from "../../actions/actions";
import {
  signInUser,
  signOutUser,
} from "../../service/firebaseAuth/firebaseAuth";
import {
  signInUserSucceed,
  signInUserFailed,
  signOutUserSucceed,
  signOutUserFailed,
} from "../../actions/actionsAuth/actionsAuth";

export function* signInWorker() {
  const User: { user: any } = {
    user: "",
  };

  try {
    yield signInUser().then((user) => {
      User.user = user;
    });
    yield put(signInUserSucceed(User.user));
  } catch (error) {
    console.log("authsaga", error);
    yield put(signInUserFailed());
  }
}

export function* signOutWorker() {
  try {
    yield signOutUser();
    yield put(signOutUserSucceed());
  } catch (error) {
    console.log(error);
    yield put(signOutUserFailed());
  }
}

export function* signOutWatcher() {
  yield takeEvery(SIGN_OUT, signOutWorker);
}

export function* signInWatcher(): any {
  yield takeEvery(SIGN_IN, signInWorker);
}

export default function* authSaga(): Generator {
  yield all([call(signInWatcher), call(signOutWatcher)]);
}
