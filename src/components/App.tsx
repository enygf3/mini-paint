import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";

import SignPage from "./SignPage/SignPage";
import NewPage from "./NewPage/NewPage";

import "../assets/sass/App.sass";

// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";

// firebase.initializeApp({
//   apiKey: "AIzaSyDH0040LpT4mz1OwvDA-1F2S9ICCuhq5XY",
//   authDomain: "mini-paint-99227.firebaseapp.com",
//   projectId: "mini-paint-99227",
//   storageBucket: "mini-paint-99227.appspot.com",
//   messagingSenderId: "952872190797",
//   appId: "1:952872190797:web:fae42a89e778fbb0a42d04",
//   measurementId: "G-X0JP9SKPZE",
// });

// const auth = firebase.auth();
// const firestore = firebase.firestore();

const App = () => (
  <Router>
    <div className="app">
      <Routes>
        <Route path="/new" element={<NewPage />} />
        <Route path="/login" element={<SignPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
