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


import SignPage from "./components/SignPage/SignPage";
import NewPage from "./components/NewPage/NewPage";
import HomePage from "./components/HomePage/HomePage";

import "./assets/sass/App.sass";
import {useAuthState} from "react-firebase-hooks/auth";
import {useSelector} from "react-redux";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const PrivateWrapper = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {

  return (
      <div className="app">
        <Routes>
          <Route element={<PrivateWrapper />} >
            <Route path="/new" element={<NewPage />} />
          </Route>
          <Route path="/login" element={<SignPage />} />
          <Route element={<PrivateWrapper />} >
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </div>
  );
};

export default App;
