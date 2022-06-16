import { useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { ReactElement, useEffect } from "react";
import { SET_STATE_SIGNED_IN } from "../../actions/actions";
import Loader from "../Loader/Loader";
import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateWrapper = (): ReactElement => {
  const dispatch = useDispatch();
  const [user, loading] = useAuthState(getAuth());

  useEffect(() => {
    if (user && !loading) {
      dispatch({
        type: SET_STATE_SIGNED_IN,
        payload: {
          isLoggedIn: true,
          user: user,
        },
      });
    }
  }, [loading]);

  if (loading) {
    return <Loader />;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateWrapper;
