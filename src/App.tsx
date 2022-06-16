import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import SignPage from "./pages/SignPage/SignPage";
import NewPage from "./pages/NewPage/NewPage";
import HomePage from "./pages/HomePage/HomePage";
import "./assets/sass/App.sass";
import "./assets/sass/Sign.sass";
import "./assets/sass/Home.sass";
import "./assets/sass/New.sass";
import PrivateWrapper from "./core/components/PrivateWrapper/PrivateWrapper";

const App = () => {
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
