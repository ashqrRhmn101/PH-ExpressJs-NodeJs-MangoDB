import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Cards from "./Components/Cards.jsx";
import Main from "./Components/Main.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/cards",
        element: <Cards />,
        loader: () => fetch("http://localhost:5000/cards"),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
