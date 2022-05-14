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

import { createContext } from "react";

import SignPage from "./components/SignPage/SignPage";
import NewPage from "./components/NewPage/NewPage";
import HomePage from "./components/HomePage/HomePage";

import "./assets/sass/App.sass";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

console.log(firebaseConfig);

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

export const Context = createContext(null);

const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => (
  <Context.Provider
    value={{
      firebase,
      auth,
      firestore,
    }}
  >
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
  </Context.Provider>
);

export default App;
