import { useDispatch } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { ReactElement, useEffect } from 'react';
import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { doAuthAction } from '../../actions/auth';
import Loader from '../Loader/Loader';

const PrivateWrapper = (): ReactElement => {
  const dispatch = useDispatch();
  const [user, loading] = useAuthState(getAuth());

  useEffect(() => {
    if (user && !loading) {
      dispatch(doAuthAction.success({ payload: user }, null));
    }
  }, [loading]);

  if (loading) {
    return <Loader />;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateWrapper;
