import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";

import SignPage from "./pages/SignPage/SignPage";
import NewPage from "./pages/NewPage/NewPage";
import HomePage from "./pages/HomePage/HomePage";

import "./assets/sass/App.sass";
import { setPersistence, browserSessionPersistence } from "firebase/auth";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { SET_STATE_SIGNED_IN } from "./core/actions/actions";

import { auth } from "./core/components/firebase/firebase";

const PrivateWrapper = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state: any) => state.isLoggedIn);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user && !isLoggedIn) {
        dispatch({
          type: SET_STATE_SIGNED_IN,
          payload: {
            user: user,
            isLoggedIn: true,
          },
        });
        localStorage.setItem("isLoggedIn", "true");
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      <Routes>
        <Route element={<PrivateWrapper />}>
          <Route path="/new" element={<NewPage />} />
        </Route>
        <Route path="/login" element={<SignPage />} />
        <Route element={<PrivateWrapper />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
