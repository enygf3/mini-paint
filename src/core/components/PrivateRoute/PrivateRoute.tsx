import * as React from "react";
import { Route, RouteProps } from "react-router-dom";
import SignPage from "../../../pages/SignPage/SignPage";

const PrivateRoute = ({
  isLoged,
  path,
  component,
}: {
  isLoged: boolean;
  path: string;
  component: any;
}) => {
  return (
    <>
      {isLoged ? (
        <>
          <Route path={path} element={component} />
        </>
      ) : (
        <>
          <Route path="/login" element={<SignPage />} />
        </>
      )}
    </>
  );
};

export default PrivateRoute;
