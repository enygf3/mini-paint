import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useContext } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { Context } from "../../App";

const SignPage = () => {
  const { auth } = useContext(Context);

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
    console.log(user);
  };

  return (
    <main>
      <h3 className="page-title">Please, sign in</h3>
      <div className="page-forms">
        <span>
          <button className="page-form email">Continue with Email</button>
          <FontAwesomeIcon className="form-img" icon={faEnvelope} />
        </span>
        <span>
          <button onClick={login} className="page-form google">
            Continue with Google
          </button>
          <FontAwesomeIcon className="form-img" icon={faGoogle} />
        </span>
      </div>
    </main>
  );
};

export default SignPage;
