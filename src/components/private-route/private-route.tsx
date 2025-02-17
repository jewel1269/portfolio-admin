import { Navigate, Outlet } from "react-router-dom";
import { FC } from "react";

type PrivateRouteProps = {
    children?: React.ReactNode;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("token");

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
