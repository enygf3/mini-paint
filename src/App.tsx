import * as React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import SignPage from "./pages/SignPage/SignPage";
import NewPage from "./pages/NewPage/NewPage";
import HomePage from "./pages/HomePage/HomePage";

import "./assets/sass/App.sass";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Loader from "./core/components/Loader/Loader";

import { SET_STATE_SIGNED_IN, SIGN_IN } from "./core/actions/actions";

import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

const PrivateWrapper = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const dispatch = useDispatch();
  const [user, loading] = useAuthState(getAuth());

  useEffect(() => {
    if (!user && !loading) {
      dispatch({
        type: SIGN_IN,
      });
    }

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

  return (
    <div className="app">
      <Routes>
        <Route element={<PrivateWrapper isLoggedIn={!!user} />}>
          <Route path="/new" element={<NewPage />} />
        </Route>
        <Route path="/login" element={<SignPage />} />
        <Route element={<PrivateWrapper isLoggedIn={!!user} />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
