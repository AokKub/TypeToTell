import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import LoginPage from "./components/LoginComponent";
import SignupPage from "./pages/SignUp";
import { EditAccountPage } from "./pages/EditAccountPage";
import { BookShelfPage } from "./pages/BookShelfPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },

  {
    path: "/edit-account",
    element: <EditAccountPage />,
  },

  {
    path: "/bookshelf",
    element: <BookShelfPage />,
  },



]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
