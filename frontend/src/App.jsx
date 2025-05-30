import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import HomeComponent from "./components/HomeComponent";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeComponent />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
