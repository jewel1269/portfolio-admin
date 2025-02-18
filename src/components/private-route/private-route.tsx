import { Navigate } from "react-router-dom";
import { FC } from "react";

type PrivateRouteProps = {
  children?: React.ReactNode;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  console.log(children);
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
