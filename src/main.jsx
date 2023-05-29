import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import "./index.scss";
import Admin from "./routes/Admin";
import Course from "./routes/Course";
import CourseProfessor from "./routes/CourseProfessor";
import Courses from "./routes/Courses";
import Email from "./routes/Email";
import Events from "./routes/Events";
import Forum from "./routes/Forum";
import LandingPage from "./routes/LandingPage";
import Login from "./routes/Login";
import Logup from "./routes/Logup";
import NewCourse from "./routes/NewCourse";
import NewProfessor from "./routes/NewProfessor";
import Professor from "./routes/Professor";
import User from "./routes/User";
import Users from "./routes/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/logup",
    element: <Logup />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user",
    element: <User />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/course",
    element: <Course />,
    errorElement: <ErrorPage />,
  },
  {
    path: "course/forum/:forum_id",
    element: <Forum />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/professor",
    element: <Professor />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/professor/course",
    element: <CourseProfessor />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/users/:course_id",
    element: <Users />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/courses",
    element: <Courses />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/events",
    element: <Events />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/new-course",
    element: <NewCourse />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/new-professor",
    element: <NewProfessor />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/email",
    element: <Email />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
