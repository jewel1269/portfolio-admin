import { createBrowserRouter } from "react-router-dom"; // Fixed import
import Login from "../auth/login/login";
import Register from "../auth/register/register";
import Dashboard from "../components/main/dashboard/dashboard";
import Home from "../components/home/home";
// import PrivateRoute from "../components/private-route/private-route";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <div>Error Page</div>,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/dashboard",
        element:  <Dashboard />,
        children: [
            {
                path: "home",
                element: <Home />,
            },
        ],
    },
]);

export default routes;
