import { createBrowserRouter } from "react-router-dom"; // Fixed import
import Login from "../auth/login/login";
import Register from "../auth/register/register";
import Dashboard from "../components/main/dashboard/dashboard";
import AdminProfile from "../components/profile/profile";
import PrivateRoute from "../components/private-route/private-route";
import BlogForm from "../components/create-book/create-book";
import ProjectForm from '../components/create-project/project';

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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "createProject",
        element: <ProjectForm />,
      },
      {
        path: "createBlog",
        element: <BlogForm />,
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
      
    ],
    
  },
]);

export default routes;
