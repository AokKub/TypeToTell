import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { EditAccountPage } from "./pages/EditAccountPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/edit-account",
    element: <EditAccountPage />,
  },

]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
