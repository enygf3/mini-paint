import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../App";

import { Navigate } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";

const SignPage = () => {
  const dispatch = useDispatch();

  const [user] = useAuthState(auth as any);

  const signUpGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
    return user;
  };

  const getAuth = () => {
    const user = signUpGoogle();
    dispatch({ type: "SIGN_IN", payload: user });
  };

  dispatch({ type: "SIGN_IN", payload: user });

  return !user ? (
    <main>
      <h3 className="page-title">Please, sign in</h3>
      <div className="page-forms">
        <span>
          <button onClick={getAuth} className="page-form google">
            Continue with Google
          </button>
          <FontAwesomeIcon className="form-img" icon={faGoogle} />
        </span>
      </div>
    </main>
  ) : (
    <Navigate to="/" />
  );
};

export default SignPage;
