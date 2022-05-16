import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {useDispatch, useSelector} from "react-redux";

import {Navigate, useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";

import {signInUser} from "../service/firebaseAuth/firebaseAuth";

const SignPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signUpGoogle = async () => {
        const { user } = await signInUser()
        dispatch({
            type: "SIGN_IN",
            payload: user,
        });
        localStorage.setItem("isLoggedIn", `${!!user}`)
        await navigate("/")
    };
  return !localStorage.getItem("isLoggedIn") ? (
    <main>
      <h3 className="page-title">Please, sign in</h3>
      <div className="page-forms">
        <span>
          <button onClick={signUpGoogle} className="page-form google">Continue with Google</button>
          <FontAwesomeIcon className="form-img" icon={faGoogle} />
        </span>
      </div>
    </main>
  ) : <Navigate to={`/`} />;
};

export default SignPage;
