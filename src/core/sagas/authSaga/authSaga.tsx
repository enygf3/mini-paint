import { takeEvery, put, call, all } from "@redux-saga/core/effects";
import { SIGN_IN } from "../../actions/actions";
import { signInUser } from "../../service/firebaseAuth/firebaseAuth";
import {
  signInUserSucceed,
  signInUserFailed,
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

export function* signIn(): any {
  yield takeEvery(SIGN_IN, signInWorker);
}

export default function* authSaga(): Generator {
  yield all([call(signIn)]);
}
