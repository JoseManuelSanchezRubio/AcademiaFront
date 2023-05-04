import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import '../src/index.css';
import ErrorPage from './ErrorPage';
import Course from './routes/Course';
import Forum from './routes/Forum';
import LandingPage from './routes/LandingPage';
import Login from './routes/Login';
import Logup from './routes/Logup';
import Profile from './routes/Profile';

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
    path: "/profile",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/course",
    element: <Course />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forum/:forum_id",
    element: <Forum />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)