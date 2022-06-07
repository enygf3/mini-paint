import * as React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import SignPage from "./pages/SignPage/SignPage";
import NewPage from "./pages/NewPage/NewPage";
import HomePage from "./pages/HomePage/HomePage";

import "./assets/sass/App.sass";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { SET_STATE_SIGNED_IN, SIGN_IN } from "./core/actions/actions";

import { auth } from "./core/components/firebase/firebase";

const PrivateWrapper = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const dispatch = useDispatch();

  const isLoggedIn: boolean = useSelector(
    (state: any) => state.auth.isLoggedIn
  );
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user && !isLoggedIn) {
        dispatch({
          type: SIGN_IN,
        });
      } else {
        dispatch({
          type: SET_STATE_SIGNED_IN,
          payload: {
            isLoggedIn: true,
            user: user,
          },
        });
      }
    });
  }, [dispatch]);
  return (
    <div className="app">
      <Routes>
        <Route element={<PrivateWrapper isLoggedIn={isLoggedIn} />}>
          <Route path="/new" element={<NewPage />} />
        </Route>
        <Route path="/login" element={<SignPage />} />
        <Route element={<PrivateWrapper isLoggedIn={isLoggedIn} />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
