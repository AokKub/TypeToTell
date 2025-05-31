import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import LoginPage from "./components/LoginComponent";
import SignupPage from "./pages/SignUp";
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
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
