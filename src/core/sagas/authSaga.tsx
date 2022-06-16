import { takeEvery, put, call, all } from "@redux-saga/core/effects";
import { SIGN_IN, SIGN_OUT } from "../actions/actions";
import { signInUser, signOutUser } from "../service/firebaseAuth";
import {
  signInUserSucceed,
  signInUserFailed,
  signOutUserSucceed,
  signOutUserFailed,
} from "../actions/actionsAuth";

export function* signInWorker(): Generator {
  const User: { user: object } = {
    user: {},
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

export function* signOutWorker(): Generator {
  try {
    yield signOutUser();
    yield put(signOutUserSucceed());
  } catch (error) {
    console.log(error);
    yield put(signOutUserFailed());
  }
}

export function* signOutWatcher(): Generator {
  yield takeEvery(SIGN_OUT, signOutWorker);
}

export function* signInWatcher(): Generator {
  yield takeEvery(SIGN_IN, signInWorker);
}

export default function* authSaga(): Generator {
  yield all([call(signInWatcher), call(signOutWatcher)]);
}
