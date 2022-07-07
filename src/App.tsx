import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Toaster } from 'react-hot-toast';
import SignPage from './pages/SignPage/SignPage';
import NewPage from './pages/NewPage/NewPage';
import HomePage from './pages/HomePage/HomePage';
import PrivateWrapper from './core/components/PrivateWrapper/PrivateWrapper';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import './assets/sass/styles.sass';

const App = () => {
  return (
    <div className="app">
      <Toaster
        position="top-right"
        toastOptions={{
          error: {
            style: {
              background: 'red',
              color: '#fff',
              top: '15px',
              right: '15px',
            },
          },
        }}
      />
      <Routes>
        <Route element={<PrivateWrapper />}>
          <Route path="/new" element={<NewPage />} />
        </Route>
        <Route path="/login" element={<SignPage />} />
        <Route element={<PrivateWrapper />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<PrivateWrapper />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
