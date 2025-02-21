import { createBrowserRouter } from "react-router-dom"; // Fixed import
import Login from "../auth/login/login";
import Register from "../auth/register/register";
import Dashboard from "../components/main/dashboard/dashboard";
import Home from "../components/home/home";
import StudentTable from "../components/students/students";
import BookList from "../components/books/books";
import BookForm from "../components/create-book/create-book";
import AdminProfile from "../components/profile/profile";
import PrivateRoute from "../components/private-route/private-route";
import BookDetails from "../components/details/books/books";
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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "student",
        element: <StudentTable />,
      },
      {
        path: "books",
        element: <BookList />,
      },
      {
        path: "createBook",
        element: <BookForm />,
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
      {
        path: "books/:id",
        element: <BookDetails />,
      }
      
    ],
    
  },
]);

export default routes;
