import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../../App";
import {Navigate} from "react-router-dom";

const SignPage = () => {
    const dispatch = useDispatch()
    const store:any = useSelector((state) => state);
    const isLoggedIn = !!store.user;
    console.log(store)

    const signUpGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const { user } = await auth.signInWithPopup(provider)
        dispatch({
            type: "SIGN_IN",
            payload: user,
        });
    };

  return isLoggedIn ? <Navigate to={"/"}></Navigate> : (
    <main>
      <h3 className="page-title">Please, sign in</h3>
      <div className="page-forms">
        <span>
          <button onClick={signUpGoogle} className="page-form google">Continue with Google</button>
          <FontAwesomeIcon className="form-img" icon={faGoogle} />
        </span>
      </div>
    </main>
  );
};

export default SignPage;
