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

import SignPage from "./SignPage/SignPage";
import NewPage from "./NewPage/NewPage";
import HomePage from "./HomePage/HomePage";

import "../assets/sass/App.sass";

import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDH0040LpT4mz1OwvDA-1F2S9ICCuhq5XY",
  authDomain: "mini-paint-99227.firebaseapp.com",
  projectId: "mini-paint-99227",
  storageBucket: "mini-paint-99227.appspot.com",
  messagingSenderId: "952872190797",
  appId: "1:952872190797:web:fae42a89e778fbb0a42d04",
  measurementId: "G-X0JP9SKPZE",
};

// const app = firebase.initializeApp(firebaseConfig);
// const auth = getAuth();

// const provider = new GoogleAuthProvider();
// provider.setCustomParameters({
//   login_hint: "user@example.com",
// });

// signInWithRedirect(auth, provider);

const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => (
  <Router>
    <div className="app">
      <Routes>
        <Route path="/new" element={<PrivateRoute isAuthenticated={0} />}>
          <Route element={<NewPage />} />
        </Route>
        <Route path="/login" element={<SignPage />} />
        <Route path="/" element={<PrivateRoute isAuthenticated={0} />}>
          <Route element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  </Router>
);

export default App;
